# Monster-Bilder vorbereiten: Hintergrund entfernen, Körper-Kreis ausmessen, zuschneiden, verkleinern.
# Aufruf: python3 tools/bilder.py   (liest assets/original/*.png, schreibt assets/monster/*.webp + monster.json)
import glob, json, os, sys
import numpy as np, cv2
from PIL import Image
from scipy import ndimage as ndi

OUT = 384
def largest(mask):
    lab, n = ndi.label(mask)
    if n == 0: return mask
    sizes = ndi.sum(mask, lab, range(1, n + 1))
    return lab == (1 + int(np.argmax(sizes)))

def cutout(rgba):
    rgb = rgba[..., :3].astype(np.int32); al = rgba[..., 3]
    h, w = al.shape
    if (al < 10).mean() > 0.05:                       # echtes transparentes Bild
        mask = al >= 250 if ((al >= 10) & (al < 245)).mean() > 0.05 else al >= 128
    else:                                             # Hintergrund weiß oder Schachbrett: vom Rand her füllen
        bright = rgb.min(axis=2) > 185; grey = (rgb.max(axis=2) - rgb.min(axis=2)) < 22
        bg = bright & grey
        lab, n = ndi.label(bg)
        edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
        mask = ~np.isin(lab, edge[edge > 0])
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    mask = cv2.morphologyEx(mask.astype(np.uint8), cv2.MORPH_OPEN, k).astype(bool)
    mask = ndi.binary_fill_holes(largest(mask))
    mask = cv2.erode(mask.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))).astype(bool)
    soft = cv2.GaussianBlur(mask.astype(np.float32), (0, 0), 1.2)      # weiche Kante
    soft = np.clip((soft - 0.35) / 0.5, 0, 1) * mask
    out = rgba.copy(); out[..., 3] = (soft * 255).astype(np.uint8)
    return out, mask

info = {}
import re
for path in sorted(glob.glob('assets/original/*.png')):
    name = os.path.splitext(os.path.basename(path))[0]
    if not re.fullmatch(r'(feuer|wasser|erde|luft|zucker)[1-6]', name): continue   # nur Monster-Bilder
    rgba = np.array(Image.open(path).convert('RGBA'))
    out, mask = cutout(rgba)
    dist = ndi.distance_transform_edt(mask)           # größter Kreis, der in den Körper passt
    cy, cx = np.unravel_index(np.argmax(dist), dist.shape); r = float(dist[cy, cx])
    ys, xs = np.nonzero(mask)
    half = int(np.ceil(max(cx - xs.min(), xs.max() - cx, cy - ys.min(), ys.max() - cy))) + 4
    pad = np.zeros((half * 2, half * 2, 4), np.uint8)
    h, w = mask.shape
    x0, y0 = cx - half, cy - half
    sx0, sy0, sx1, sy1 = max(0, x0), max(0, y0), min(w, x0 + 2 * half), min(h, y0 + 2 * half)
    pad[sy0 - y0:sy1 - y0, sx0 - x0:sx1 - x0] = out[sy0:sy1, sx0:sx1]
    Image.fromarray(pad).resize((OUT, OUT), Image.LANCZOS).save(f'assets/monster/{name}.webp', quality=88, method=6)
    info[name] = {'k': round(half / r, 3)}            # Bildbreite = 2 * Radius * k
    print(name, 'Körper-Radius', round(r), 'Faktor k', info[name]['k'], 'kB', os.path.getsize(f'assets/monster/{name}.webp') // 1024)
json.dump(info, open('assets/monster/monster.json', 'w'), indent=1)

# Kontrollbild: alle Monster je Familie in einer Zeile, abwechselnd heller und dunkler Hintergrund, mit Körper-Kreis
import PIL.ImageDraw as D
fams = []
for n in sorted(info):
    f = n.rstrip('0123456789')
    if f not in fams: fams.append(f)
cell = 200
sheet = Image.new('RGB', (cell * 6, cell * len(fams)), '#FFF9EC')
dr = D.Draw(sheet)
for row, f in enumerate(fams):
    if row % 2: dr.rectangle([0, row * cell, cell * 6, row * cell + cell], fill='#1B2A33')
    for col in range(6):
        n = f + str(col + 1)
        if n not in info: continue
        im = Image.open(f'assets/monster/{n}.webp').resize((cell - 20, cell - 20), Image.LANCZOS)
        sheet.paste(im, (col * cell + 10, row * cell + 10), im)
        rr = (cell - 20) / 2 / info[n]['k']; c = (col * cell + cell / 2, row * cell + cell / 2)
        dr.ellipse([c[0] - rr, c[1] - rr, c[0] + rr, c[1] + rr], outline='#00FF66', width=2)
sheet.save(sys.argv[1] if len(sys.argv) > 1 else '/tmp/kontrolle.png')
