'use client';

import { SCHOOL } from '@/lib/constants';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href?: string;
};

/** スマホでは LINE アプリを直接開く（QR 案内ページを避ける） */
export default function LineLink({ href, onClick, children, ...rest }: Props) {
  const url = href ?? SCHOOL.lineUrl;
  if (!url) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const match = url.match(/line\.me\/ti\/p\/([^/?#]+)/i);
    if (isMobile && match?.[1]) {
      e.preventDefault();
      window.location.href = `line://ti/p/${match[1]}`;
    }
  };

  return (
    <a href={url} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
