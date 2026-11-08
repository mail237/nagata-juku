'use client';

import FeaturePointCards from '@/components/sections/FeaturePointCards';

export default function FeaturesSection() {
  return (
    <FeaturePointCards
      className="pt-10 pb-16 md:pt-14 md:pb-24 bg-surface"
      eyebrow="Why Choose Us"
      title="選ばれる3つの理由"
      lead="よく選ばれる理由は、この3つです。"
      cta={{ href: '/service#reasons-detail', label: '詳しい説明・料金を見る' }}
    />
  );
}
