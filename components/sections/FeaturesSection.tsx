'use client';

import FeaturePointCards from '@/components/sections/FeaturePointCards';

export default function FeaturesSection() {
  return (
    <FeaturePointCards
      className="pt-10 pb-16 md:pt-14 md:pb-24 bg-surface"
      eyebrow="Why Choose Us"
      title="選ばれる3つの理由"
      cta={{ href: '/service', label: '料金を見る' }}
    />
  );
}
