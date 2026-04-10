import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Cloudflare Pages / edge 環境でも確実に効くリダイレクトを集約。
 * - /feature → /service（旧サイト互換）
 * - http → https（Cloudflare 側で強制できるが、念のため二重化）
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // 1) パスの互換リダイレクト（先に適用）
  if (url.pathname === '/feature' || url.pathname === '/feature/') {
    url.pathname = '/service';
    return NextResponse.redirect(url, 301);
  }

  // 2) http → https（Cloudflare の x-forwarded-proto を優先）
  const proto = req.headers.get('x-forwarded-proto') ?? url.protocol.replace(':', '');
  if (proto === 'http') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // 静的ファイルや Next 内部ルートは除外
  matcher: ['/((?!_next/|favicon.ico|.*\\..*).*)'],
};

