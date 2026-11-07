import sys
import os
from pathlib import Path

# Add scripts directory to path to import generate_images
sys.path.append(str(Path(__file__).parent / "scripts"))
import generate_images

PROMPT = (
    "ultra wide banner photograph, natural everyday photo, Japanese teenage girl studying, "
    "student seated on left side of frame, facing right toward desk, medium shot waist up, "
    "left side profile, head tilted down looking at paper and book, not looking at camera, "
    "face turned away, small profile in frame, shallow depth of field with face slightly softer focus than hands and desk, "
    "brown hair tied in a neat ponytail, calm studying pose, "
    "white long sleeve school blouse, open collar, no ribbon, no necktie, no bow, "
    "dark navy pleated skirt, "
    "large window far left, blurred green trees outside, soft daylight, "
    "white sheer curtain visible toward the right side of frame, plain off-white wall, space toward right third, "
    "warm brown wooden desk, open textbook or notebook center, loose white sheet for writing, "
    "right hand holding pen writing, left hand on open book, "
    "black tablet on small wooden stand on right side of desk, "
    "no laptop, no desk lamp, "
    "even soft indoor light, muted colors, moderate depth of field f3.5 to f5.6, "
    "Canon DSLR 50mm, ISO 400, slight natural noise, coherent anatomy, photorealistic snapshot"
)

generate_images.IMAGES = [
    {
        "filename": "hero-banner.png",
        "width": 1280,
        "height": 640,
        "steps": 4,
        "prompt": PROMPT,
    }
]

if __name__ == "__main__":
    generate_images.main()
