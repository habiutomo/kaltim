import HeroSection from '@/components/home/HeroSection';
import InfoCards from '@/components/home/InfoCards';
import NewsSection from '@/components/home/NewsSection';
import AboutSection from '@/components/home/AboutSection';
import GovernmentStructure from '@/components/home/GovernmentStructure';
import PublicServices from '@/components/home/PublicServices';
import DocumentRepository from '@/components/home/DocumentRepository';
import ContactSection from '@/components/home/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <InfoCards />
      <NewsSection />
      <AboutSection />
      <GovernmentStructure />
      <PublicServices />
      <DocumentRepository />
      <ContactSection />
    </>
  );
};

export default Home;
