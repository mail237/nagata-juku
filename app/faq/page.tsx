import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import FAQAccordionSection from '@/components/faq/FAQAccordionSection';
import ContactCTASection from '@/components/sections/ContactCTASection';

export const metadata: Metadata = {
  title: 'よくあるご質問',
  description:
    '永田塾（大阪・八尾市の個別指導塾）のよくある質問です。授業の進め方、通いホーダイの料金、入塾の条件などをまとめています。',
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          label="FAQ"
          title="よくあるご質問"
        />

        <FAQAccordionSection />

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
