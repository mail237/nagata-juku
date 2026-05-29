# サイト状態のスナップショット

いつでも戻せるように **Git タグ** で保存しています。

## タグ一覧

| タグ名 | 内容 |
|--------|------|
| `snapshot-before-hero-junior-banner` | **直前の状態**。ヒーローは `hero-banner.png` ＋ 白いキャッチコピー帯 |
| `snapshot-before-hero-2026-05-29` | 同上（授業風景＋キャッチコピー帯） |
| `snapshot-before-hero-2026-05` | のどか常駐・LINEボタン・きょうのひとこと削除後。旧ヒーロー画像 |

## この状態に戻す

### いまのヒーロー（バナー画像）をやめて、直前に戻す

```bash
cd /Users/tomohiro/Projects/nagata-juku
git fetch origin
git checkout snapshot-before-hero-junior-banner -- components/sections/HeroSection.tsx
# 本番に反映する場合
git add components/sections/HeroSection.tsx
git commit -m "ヒーローを差し替え前の授業風景＋キャッチコピーに戻す"
git push origin main
```

`hero-banner.png` はリポジトリに残しています（削除していません）。

### さらに以前（2026-05 実験前）に戻す

```bash
git checkout snapshot-before-hero-2026-05-29 -- components/sections/HeroSection.tsx
# またはタグ全体
git checkout snapshot-before-hero-2026-05
```

## ヒーロー画像

| ファイル | 内容 |
|----------|------|
| `hero-banner-1920x800.png` | **現行**（中学生バナー・HD版） |
| `hero-banner-junior-student.png` | 中学生バナー（1024×434） |
| `hero-banner.png?v=restore-pre-edit` | 授業風景＋キャッチコピー帯（`snapshot-before-hero-junior-banner`） |
| `hero-banner-2026-05-hq.webp` | 1枚目・私服、EDSR 2560px |
| `hero-banner-2026-05-uniform.png` | 制服・学習イメージ |
| `hero-banner-2026-05-gemini.png` | 私服・学習（Gemini） |
| `hero-banner-2026-05.png` | ChatGPT・私服（1024px） |
