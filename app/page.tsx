import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import CommitmentStripSection from '@/components/sections/CommitmentStripSection';
import HighlightsSection from '@/components/sections/HighlightsSection';
import CoursesSection from '@/components/sections/CoursesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import NewClassSlotsSection from '@/components/sections/NewClassSlotsSection';
import VacancyProgrammingSection from '@/components/sections/VacancyProgrammingSection';
import OsakaSubsidySection from '@/components/sections/OsakaSubsidySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactCTASection from '@/components/sections/ContactCTASection';
import HomePlayfulness from '@/components/home/HomePlayfulness';

/**
 * トップページの縦順（保護者の検討フロー）
 * ① 第一印象 → ② 共感 → ③ 解決策 → ④ 塾の約束・魅力 → ⑤ 特長・理由
 * → ⑥ 空席・関連案内 → ⑦ 信頼（声） → ⑧ 不安解消 → ⑨ 申し込み
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <HomePlayfulness />
      <main className="scroll-pt-24">
        <HeroSection />
        <MarqueeSection />
        <ProblemSection />
        <SolutionSection />
        <CommitmentStripSection />
        <HighlightsSection />
        <CoursesSection />
        <FeaturesSection />
        <NewClassSlotsSection />
        <VacancyProgrammingSection />
        <OsakaSubsidySection />
        <TestimonialsSection />
        <FAQSection />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
