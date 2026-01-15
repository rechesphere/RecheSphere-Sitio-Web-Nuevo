
import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ChatBot from './components/UI/ChatBot';
import CookieConsent from './components/UI/CookieConsent';
import LoadingFallback from './components/UI/LoadingFallback';

// Lazy load pages to improve initial performance
const Home = React.lazy(() => import('./pages/Home'));
const MetaAdsPage = React.lazy(() => import('./pages/MetaAdsPage'));
const FunnelsPage = React.lazy(() => import('./pages/FunnelsPage'));
const SocialGrowthPage = React.lazy(() => import('./pages/SocialGrowthPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CookiePolicyPage = React.lazy(() => import('./pages/CookiePolicyPage'));

const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meta-ads" element={<MetaAdsPage />} />
          <Route path="/embudos" element={<FunnelsPage />} />
          <Route path="/gestion-estrategica" element={<SocialGrowthPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          {/* Fallback routes */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      
      {/* Global UI Components */}
      <CookieConsent />
      <ChatBot />
    </HashRouter>
  );
};

export default App;
