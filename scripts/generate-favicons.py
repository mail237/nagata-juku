#!/usr/bin/env python3
"""永田塾公式ロゴからファビコン一式を生成する。"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
LOGO_PATH = PUBLIC / "images" / "nagata-juku-logo.png"
# ロゴは白背景向けデザイン
BG = (255, 255, 255, 255)


def _load_logo() -> Image.Image:
    return Image.open(LOGO_PATH).convert("RGBA")


def _mark_crop(logo: Image.Image) -> Image.Image:
    """左側の本・えんぴつマーク部分を正方形に切り出す（小サイズ向け）。"""
    w, h = logo.size
    side = min(h, int(w * 0.32))
    return logo.crop((0, 0, side, h))


def logo_icon(size: int, *, mark_only: bool = False) -> Image.Image:
    logo = _load_logo()
    if mark_only or size <= 32:
        logo = _mark_crop(logo)

    canvas = Image.new("RGBA", (size, size), BG)
    pad = int(size * (0.1 if mark_only or size <= 32 else 0.08))
    inner = size - pad * 2
    lw, lh = logo.size
    scale = min(inner / lw, inner / lh)
    nw, nh = max(1, int(lw * scale)), max(1, int(lh * scale))
    resized = logo.resize((nw, nh), Image.Resampling.LANCZOS)
    x, y = (size - nw) // 2, (size - nh) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


def main() -> None:
    if not LOGO_PATH.is_file():
        raise SystemExit(f"Logo not found: {LOGO_PATH}")

    for size in (16, 32, 48, 96, 192):
        mark_only = size <= 32
        img = logo_icon(size, mark_only=mark_only)
        if size >= 48:
            img.save(PUBLIC / f"favicon-{size}x{size}.png", optimize=True)

    logo_icon(32, mark_only=True).save(PUBLIC / "favicon-32x32.png", optimize=True)
    logo_icon(180, mark_only=False).save(PUBLIC / "apple-icon.png", optimize=True)

    ico_base = logo_icon(48, mark_only=False)
    for name in ("favicon.ico", "nagata-juku-icon.ico"):
        ico_base.save(PUBLIC / name, format="ICO", sizes=[(48, 48), (32, 32), (16, 16)])

    logo_icon(48, mark_only=False).save(PUBLIC / "nagata-juku-icon.png", optimize=True)

    print("Favicons generated from", LOGO_PATH.name)


if __name__ == "__main__":
    main()
