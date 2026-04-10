import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

/** 印刷用HTML。/nyujuku-annai.html と同じ内容を返す（.html なしでも開けるように） */
export async function GET() {
  const filePath = join(process.cwd(), 'public', 'nyujuku-annai.html');
  const html = readFileSync(filePath, 'utf8');
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
