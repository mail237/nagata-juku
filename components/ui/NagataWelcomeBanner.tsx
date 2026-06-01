import Image from 'next/image';
import { WELCOME_BANNER } from '@/lib/constants';

type Props = {
  className?: string;
};

/** 「個別指導の永田塾です」イラストバナー（ヒーローではなく装飾用・小さめ表示） */
export default function NagataWelcomeBanner({ className = '' }: Props) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src={WELCOME_BANNER.src}
        alt={WELCOME_BANNER.alt}
        width={WELCOME_BANNER.width}
        height={WELCOME_BANNER.height}
        className="h-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] rounded-lg"
        sizes="(max-width: 640px) 280px, 360px"
        priority
      />
    </div>
  );
}
