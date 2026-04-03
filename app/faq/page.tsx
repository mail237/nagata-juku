import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import FAQAccordionSection from '@/components/faq/FAQAccordionSection';
import ContactCTASection from '@/components/sections/ContactCTASection';

export const metadata: Metadata = {
  title: 'よくあるご質問',
  description:
    '永田塾の授業・入塾・通塾・料金などについてよくいただくご質問と回答をまとめました。',
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          label="FAQ"
          title="よくあるご質問"
          description="入塾・授業・料金などについてよくいただくご質問をまとめました。"
        />

        <FAQAccordionSection />

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
