#!/usr/bin/env python3
"""のどか歩きスプライトの内側の透過穴を白で埋める（背景除去の副作用対策）。"""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "nodoka"
SPRITES = ("walk-0.png", "walk-1.png")


def _border_connected_zero(alpha: np.ndarray) -> np.ndarray:
    h, w = alpha.shape
    seen = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        if alpha[0, x] == 0:
            q.append((0, x))
            seen[0, x] = True
        if alpha[h - 1, x] == 0:
            q.append((h - 1, x))
            seen[h - 1, x] = True
    for y in range(h):
        if alpha[y, 0] == 0:
            q.append((y, 0))
            seen[y, 0] = True
        if alpha[y, w - 1] == 0:
            q.append((y, w - 1))
            seen[y, w - 1] = True
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx] and alpha[ny, nx] == 0:
                seen[ny, nx] = True
                q.append((ny, nx))
    return seen


def fix_sprite(path: Path) -> int:
    arr = np.array(Image.open(path).convert("RGBA"))
    alpha = arr[:, :, 3]
    external = _border_connected_zero(alpha)
    holes = (alpha == 0) & (~external)
    n = int(holes.sum())
    arr[holes] = (255, 255, 255, 255)
    Image.fromarray(arr).save(path, optimize=True)
    return n


def main() -> None:
    for name in SPRITES:
        path = ROOT / name
        filled = fix_sprite(path)
        print(f"{name}: filled {filled} interior holes")


if __name__ == "__main__":
    main()
