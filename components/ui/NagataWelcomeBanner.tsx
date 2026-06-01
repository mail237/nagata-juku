import { WELCOME_BANNER } from '@/lib/constants';

type Props = {
  className?: string;
};

/**
 * 「個別指導の永田塾です」イラストバナー（代表あいさつ内・小〜中サイズ）
 * 原寸 1024px をブラウザで縮小表示し、ぼかし加工をかけない
 */
export default function NagataWelcomeBanner({ className = '' }: Props) {
  return (
    <div className={`flex justify-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={WELCOME_BANNER.src}
        alt={WELCOME_BANNER.alt}
        width={WELCOME_BANNER.width}
        height={WELCOME_BANNER.height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full max-w-[min(100%,18rem)] sm:max-w-[min(100%,22rem)] md:max-w-[min(100%,26rem)] rounded-lg [image-rendering:auto]"
      />
    </div>
  );
}
