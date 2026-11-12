# Geschichtsbilder und Topf-Hintergründe vorbereiten: zuschneiden, verkleinern, als WebP speichern.
# Aufruf: python3 tools/szenen.py
#   assets/original/szene-<name>.png  -> assets/story/<name>.webp        (4:3, 960 x 720)
#   assets/original/topf-<name>.png   -> assets/backgrounds/<name>.webp  (Topf-Format, 720 x 1040)
import glob, os
from PIL import Image, ImageOps

def fit(src, dst, size):
    im = Image.open(src).convert('RGB')
    im = ImageOps.fit(im, size, Image.LANCZOS, centering=(0.5, 0.5))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, quality=82, method=6)
    print(os.path.basename(src), '->', dst, os.path.getsize(dst) // 1024, 'kB')

for f in sorted(glob.glob('assets/original/szene-*.png')):
    fit(f, 'assets/story/' + os.path.basename(f)[6:-4] + '.webp', (960, 720))
for f in sorted(glob.glob('assets/original/topf-*.png')):
    fit(f, 'assets/backgrounds/' + os.path.basename(f)[5:-4] + '.webp', (720, 1040))
