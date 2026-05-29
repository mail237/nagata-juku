# サイト状態のスナップショット

いつでも戻せるように **Git タグ** で保存しています。

## タグ一覧

| タグ名 | 内容 |
|--------|------|
| `snapshot-before-hero-home-study-2026-05` | **直前の状態**。授業風景（生徒と先生）＋キャッチコピー帯 |
| `snapshot-hero-home-study-2026-05` | **現行**（2026-05）。自宅・タブレット学習のヒーロー写真 |
| `snapshot-before-hero-no-logo-2026-05` | ヒーローは `hero-banner.png` ＋ 白いキャッチコピー帯 |
| `snapshot-before-hero-yellow-2026-05` | 同上（授業風景＋キャッチコピー帯） |
| `snapshot-before-hero-hq-2026-05` | 同上（授業風景＋キャッチコピー帯） |
| `snapshot-before-hero-junior-banner` | 同上（授業風景＋キャッチコピー帯） |
| `snapshot-before-hero-2026-05-29` | 同上（授業風景＋キャッチコピー帯） |
| `snapshot-before-hero-2026-05` | のどか常駐・LINEボタン・きょうのひとこと削除後。旧ヒーロー画像 |

## この状態に戻す

### いまのヒーロー（自宅・タブレット）をやめて、直前（授業風景＋先生）に戻す

```bash
cd /Users/tomohiro/Projects/nagata-juku
./scripts/restore-hero-previous.sh
git add public/images/hero-banner.png components/sections/HeroSection.tsx
git commit -m "ヒーローを授業風景＋キャッチコピーに戻す"
git push origin main
```

**差し替え前の画像（削除しない・リポジトリに常備）**

| ファイル | 内容 |
|----------|------|
| `hero-banner-restore-pre-edit.png` | 授業風景＋先生（1376×768）メインのバックアップ |
| `hero-banner-classroom-teacher.png` | 上と同一の予備コピー |

Git タグ `snapshot-before-hero-home-study-2026-05` にも同じ画像が入っています。

### いまのヒーロー（自宅・タブレット）に再度切り替える

```bash
git checkout snapshot-hero-home-study-2026-05 -- components/sections/HeroSection.tsx public/images/hero-banner.png
```

### その他（旧タグ）

```bash
git fetch origin
git checkout snapshot-before-hero-no-logo-2026-05 -- components/sections/HeroSection.tsx
```

### さらに以前（2026-05 実験前）に戻す

```bash
git checkout snapshot-before-hero-2026-05-29 -- components/sections/HeroSection.tsx
# またはタグ全体
git checkout snapshot-before-hero-2026-05
```

## ヒーロー画像

| ファイル | 内容 |
|----------|------|
| `hero-banner-no-logo.png` | 永田塾バナー・引き伸ばしなし |
| `hero-banner.png` | **現行**（自宅・タブレット学習） |
| `hero-banner-restore-pre-edit.png` | **保管用**・差し替え前（授業風景＋先生） |
| `hero-banner-classroom-teacher.png` | **保管用**・同上の予備コピー |
| `hero-banner.png?v=restore-pre-edit` | 授業風景＋キャッチコピー帯（`snapshot-before-hero-no-logo-2026-05`） |
| `hero-banner-1920x800.png` | 黄色バナー・引き伸ばしなし表示 |
| `hero-banner-yellow.png` | 黄色バナー（1024×438） |
| `hero-banner.png?v=restore-pre-edit` | 授業風景＋キャッチコピー帯（`snapshot-before-hero-yellow-2026-05`） |
| `hero-banner-hq.png` | 永田塾バナー・1024×571 |
| `hero-banner-1920x800.png` | 中学生バナー・HD版 |
| `hero-banner-junior-student.png` | 中学生バナー（1024×434） |
| `hero-banner.png?v=restore-pre-edit` | 授業風景＋キャッチコピー帯（`snapshot-before-hero-junior-banner`） |
| `hero-banner-2026-05-hq.webp` | 1枚目・私服、EDSR 2560px |
| `hero-banner-2026-05-uniform.png` | 制服・学習イメージ |
| `hero-banner-2026-05-gemini.png` | 私服・学習（Gemini） |
| `hero-banner-2026-05.png` | ChatGPT・私服（1024px） |
