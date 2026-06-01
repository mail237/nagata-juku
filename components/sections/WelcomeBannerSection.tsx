import NagataWelcomeBanner from '@/components/ui/NagataWelcomeBanner';

/** ヒーロー直下ではなく、マーキー直後に小さく表示 */
export default function WelcomeBannerSection() {
  return (
    <section
      className="bg-white border-b border-[#C7E5EB]/25 py-5 md:py-6"
      aria-label="永田塾のご案内"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <NagataWelcomeBanner className="drop-shadow-sm" />
      </div>
    </section>
  );
}
