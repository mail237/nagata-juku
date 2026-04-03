'use client';

import FeaturePointCards from '@/components/sections/FeaturePointCards';

export default function FeaturesSection() {
  return (
    <FeaturePointCards
      className="py-20 md:py-28 bg-[#F1F5F4]"
      eyebrow="Why Choose Us"
      title="選ばれる3つの理由"
      lead="永田塾が他の塾と違う、3つの強みをご紹介します。"
      cta={{ href: '/service#reasons-detail', label: '詳しい説明・料金を見る' }}
    />
  );
}
