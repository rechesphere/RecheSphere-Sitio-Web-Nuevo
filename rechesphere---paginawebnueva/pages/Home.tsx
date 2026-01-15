
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Sections/Hero';
import Process from '../components/Sections/Process';
import Services from '../components/Sections/Services';
import PainPoints from '../components/Sections/PainPoints';
import VideoSection from '../components/Sections/VideoSection';
import ServiceVideoSection from '../components/Sections/ServiceVideoSection';
import TestimonialSpotlight from '../components/Sections/TestimonialSpotlight';
import ROASCalculator from '../components/Sections/ROASCalculator';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Seo from '../components/SEO/Seo';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there is a state with scrollTo instructions
    // This happens when navigating from MetaAdsPage or FunnelsPage
    if (location.state && (location.state as any).scrollTo) {
      const targetId = (location.state as any).scrollTo;
      const element = document.getElementById(targetId);
      
      if (element) {
        // Add a small timeout to ensure the page is fully rendered
        setTimeout(() => {
          const headerOffset = 80; // Adjust for sticky header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
          // Removed window.history.replaceState as it triggers Access Denied errors in blob environments
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Seo />
      <Header />
      <main className="flex-grow">
        <Hero />
        <ServiceVideoSection />
        <VideoSection />
        <ROASCalculator />
        <Services />
        <PainPoints />
        <TestimonialSpotlight />
        <Process />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
