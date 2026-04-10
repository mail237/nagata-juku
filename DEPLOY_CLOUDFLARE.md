# Cloudflare Pages デプロイ手順（運用メモ）

## 自動反映のルール

- **編集しただけでは反映されません**
- **`main` に `commit + push`** すると Cloudflare Pages が自動でビルドして反映します

```bash
cd /Users/tomohiro/Projects/nagata-juku
git add -A
git commit -m "update: 文言修正"
git push
```

## お問合せフォーム（Resend）

Cloudflare Pages の環境変数に以下を設定します。

- `RESEND_API_KEY`
- `CONTACT_EMAIL_FROM`
- （任意）`CONTACT_EMAIL_TO`（未設定なら `mail@nagata-juku.net`）

## 旧サイト移管向けリダイレクト

コード側で最低限の互換リダイレクトを用意しています。

- `/feature` → `/service`（301）
- `http` → `https`（301、Cloudflare 側でも通常は強制）

実装: `middleware.ts` と `next.config.mjs`（両方に入れてあります）

