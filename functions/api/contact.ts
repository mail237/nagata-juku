type Env = {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_FROM?: string;
  CONTACT_EMAIL_TO?: string;
};

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

const DEFAULT_TO = 'mail@nagata-juku.net';

// Cloudflare Pages Functions entrypoint
export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}) => {
  const { request, env } = context;
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const { name, email, phone, grade, inquiry, message, furigana, subjects } = body;
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !grade?.trim() || !inquiry?.trim()) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const apiKey = env.RESEND_API_KEY;
  const from = env.CONTACT_EMAIL_FROM;
  const to = env.CONTACT_EMAIL_TO?.trim() || DEFAULT_TO;

  if (!apiKey || !from) {
    return new Response(JSON.stringify({ ok: false, code: 'EMAIL_NOT_CONFIGURED' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
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
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

