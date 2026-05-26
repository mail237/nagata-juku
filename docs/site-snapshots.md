# サイト状態のスナップショット

いつでも戻せるように **Git タグ** で保存しています。

## タグ一覧

| タグ名 | 内容 |
|--------|------|
| `snapshot-before-hero-2026-05` | のどか常駐・LINEボタン・きょうのひとこと削除後。ヒーローは `hero-banner.png?v=restore-pre-edit` の直前 |

## この状態に戻す

```bash
cd /Users/tomohiro/Projects/nagata-juku
git fetch origin
git checkout snapshot-before-hero-2026-05
# 本番に戻す場合は main にマージして push
```

ヒーロー画像だけ以前に戻す場合:

```bash
git checkout snapshot-before-hero-2026-05 -- components/sections/HeroSection.tsx
```

## ヒーロー画像

| ファイル | 内容 |
|----------|------|
| `hero-banner.png?v=restore-pre-edit` | **現行**（2026-05 差し替え前） |
| `hero-banner-2026-05-hq.webp` | 1枚目・私服、EDSR 2560px |
| `hero-banner-2026-05-hq.png` | 同上の PNG 版 |
| `hero-banner-2026-05-uniform.png` | 制服・タブレット学習 |
| `hero-banner-2026-05-gemini.png` | 私服・タブレット学習（Gemini） |
| `hero-banner-2026-05.png` | 1枚目の元（1024px） |
| `hero-banner.png` | タグ `snapshot-before-hero-2026-05` 以前 |
