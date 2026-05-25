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

## 新しいヒーロー画像

- ファイル: `public/images/hero-banner-2026-05.png`
- 以前の画像: `public/images/hero-banner.png`（そのまま残しています）
