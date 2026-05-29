#!/bin/sh
# ヒーローを「授業風景＋先生」版（2026-05 差し替え前）に戻す
set -e
cd "$(dirname "$0")/.."

BACKUP="public/images/hero-banner-restore-pre-edit.png"
[ -f "$BACKUP" ] || BACKUP="public/images/hero-banner-classroom-teacher.png"

cp -f "$BACKUP" public/images/hero-banner.png
git checkout snapshot-before-hero-home-study-2026-05 -- components/sections/HeroSection.tsx

echo "OK: ヒーローを以前の状態に戻しました。"
echo "  画像: $BACKUP → hero-banner.png"
echo "  コード: HeroSection.tsx（タグ snapshot-before-hero-home-study-2026-05）"
echo "本番反映: git add … && git commit && git push"
