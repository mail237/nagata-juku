#!/usr/bin/env python3
"""永田塾ファビコン生成（ロゴ横長のため、検索結果向けに「永」マークを使用）。"""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "app"
BRAND = (69, 177, 199, 255)
WHITE = (255, 255, 255, 255)

FONT_CANDIDATES = [
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
]


def _load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def kanji_icon(size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), BRAND)
    draw = ImageDraw.Draw(canvas)
    font = _load_font(int(size * 0.62))
    text = "永"
    bbox = draw.textbbox((0, 0), text, font=font)
    x = (size - (bbox[2] - bbox[0])) // 2 - bbox[0]
    y = (size - (bbox[3] - bbox[1])) // 2 - bbox[1] - int(size * 0.02)
    draw.text((x, y), text, fill=WHITE, font=font)
    return canvas


def main() -> None:
    for size in (16, 32, 48, 96, 192):
        img = kanji_icon(size)
        if size >= 48:
            img.save(PUBLIC / f"favicon-{size}x{size}.png", optimize=True)
        if size == 48:
            img.save(APP / "icon.png", optimize=True)

    kanji_icon(32).save(PUBLIC / "favicon-32x32.png", optimize=True)
    kanji_icon(180).save(APP / "apple-icon.png", optimize=True)

    ico = kanji_icon(48)
    for path in (APP / "favicon.ico", PUBLIC / "favicon.ico"):
        ico.save(path, format="ICO", sizes=[(48, 48), (32, 32), (16, 16)])

    print("Favicons written to public/ and app/")


if __name__ == "__main__":
    main()
