import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import CommitmentStripSection from '@/components/sections/CommitmentStripSection';
import HighlightsSection from '@/components/sections/HighlightsSection';
import CoursesSection from '@/components/sections/CoursesSection';
import VacancyProgrammingSection from '@/components/sections/VacancyProgrammingSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactCTASection from '@/components/sections/ContactCTASection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="scroll-pt-24">
        <HeroSection />
        <MarqueeSection />
        <CommitmentStripSection />
        <HighlightsSection />
        <CoursesSection />
        <VacancyProgrammingSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
