import Layout from '../components/Layout';
import HomeSection from '../components/sections/HomeSection';
import AboutSection from '../components/sections/AboutSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import LearningSection from '../components/sections/LearningSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import LanguagesSection from '../components/sections/LanguagesSection';
import GallerySection from '../components/sections/GallerySection';
import FaqSection from '../components/sections/FaqSection';
import TipsSection from '../components/sections/TipsSection';
import SplashScreenWrapper from '../components/SplashScreenWrapper';

export default function Home() {
  return (
    <SplashScreenWrapper alwaysShow={true}>
      <Layout>
        <HomeSection />
        <AboutSection />
        <FeaturesSection />
        <LearningSection />
        <TestimonialsSection />
        <LanguagesSection />
        <GallerySection />
        <TipsSection />
        <FaqSection />

      <div className="text-center my-8 p-4 border-2 border-dashed border-red-600 bg-yellow-200">
        <h3 className="text-xl font-bold mb-2">Bergabunglah dengan Komunitas Kami!</h3>
        <p className="mb-2">Jika kamu juga seorang programmer yang malas ngoding, bergabunglah dengan komunitas IMPHNEN!</p>
        <p className="mb-4">Bersama-sama kita bisa saling memotivasi untuk... tetap malas bersama! 😂</p>
        <a
          href="#"
          className="blink text-red-600 font-bold text-lg hover:underline"
        >
          KLIK DI SINI UNTUK BERGABUNG!
        </a>
      </div>
      </Layout>
    </SplashScreenWrapper>
  );
}
