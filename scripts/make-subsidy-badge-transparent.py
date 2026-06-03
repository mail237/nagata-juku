#!/usr/bin/env python3
"""Remove outer white background from Osaka subsidy badge (corner flood-fill)."""

from collections import deque
from pathlib import Path

from PIL import Image

SRC = Path(
    "/Users/tomohiro/Library/Application Support/Cursor/User/workspaceStorage/"
    "28f23aab9f29a6cd70a34c6e7aea7e7b/images/"
    "ChatGPT Image 2026年6月3日 17_08_48-da48adb0-4a26-42a1-9d22-0d569e7beeaa.png"
)
OUT = Path(__file__).resolve().parent.parent / "public/images/osaka-juku-subsidy-badge.png"

# Pure/near-white outer mat (JPEG may be ~252–255)
WHITE_MIN = 248
WHITE_SPREAD = 12  # max(R,G,B) - min(R,G,B)


def is_background_white(r: int, g: int, b: int) -> bool:
    if r < WHITE_MIN or g < WHITE_MIN or b < WHITE_MIN:
        return False
    return max(r, g, b) - min(r, g, b) <= WHITE_SPREAD


def flood_transparent(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    w, h = rgba.size
    pixels = rgba.load()
    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if x < 0 or x >= w or y < 0 or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        r, g, b, a = pixels[x, y]
        if not is_background_white(r, g, b):
            continue
        pixels[x, y] = (r, g, b, 0)
        q.append((x + 1, y))
        q.append((x - 1, y))
        q.append((x, y + 1))
        q.append((x, y - 1))

    return rgba


def main() -> None:
    img = Image.open(SRC)
    out = flood_transparent(img)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(OUT, "PNG", optimize=True)
    print(f"Saved: {OUT} ({out.size[0]}x{out.size[1]}, RGBA)")


if __name__ == "__main__":
    main()
