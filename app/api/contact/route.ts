import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_TO = 'mail@nagata-juku.net';

type Body = {
  name?: string;
  furigana?: string;
  email?: string;
  phone?: string;
  grade?: string;
  subjects?: string[];
  inquiry?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, phone, grade, inquiry, message, furigana, subjects } = body;
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !grade?.trim() || !inquiry?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const text = [
    `お名前: ${name.trim()}`,
    furigana?.trim() ? `ふりがな: ${furigana.trim()}` : null,
    `メール: ${email.trim()}`,
    `電話: ${phone.trim()}`,
    `学年: ${grade.trim()}`,
    `ご希望の科目: ${Array.isArray(subjects) && subjects.length ? subjects.join('、') : '（未選択）'}`,
    `お問合せ内容: ${inquiry.trim()}`,
    message?.trim() ? `ご質問・ご要望:\n${message.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO?.trim() || DEFAULT_TO;

  if (!apiKey || !from) {
    return NextResponse.json({ ok: false, code: 'EMAIL_NOT_CONFIGURED' as const }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email.trim(),
      subject: `【永田塾 Webフォーム】${inquiry.trim()}（${name.trim()}様）`,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('Resend API error:', res.status, errText);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
