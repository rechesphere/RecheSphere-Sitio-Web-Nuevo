
import React, { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const Seo: React.FC<SeoProps> = ({ 
  title = "RecheSphere | Captación de clientes predecible", 
  description = "Agencia de marketing digital especializada en captación de clientes predecible mediante Meta Ads y embudos de venta.",
  image = "https://rechesphere.com/og-image.jpg", // Placeholder
  url 
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to update/create meta tags
    const setMetaTag = (name: string, content: string, isProperty: boolean = false) => {
      let element = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Meta Tags
    setMetaTag('description', description);
    
    // Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:url', url || window.location.href, true);
    setMetaTag('og:type', 'website', true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:title', title, false);
    setMetaTag('twitter:description', description, false);
    setMetaTag('twitter:image', image, false);

    // 4. JSON-LD Schema Injection (The "Secret Weapon" for SEO)
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MarketingAgency",
      "name": "RecheSphere",
      "image": image,
      "@id": "https://rechesphere.com",
      "url": window.location.origin,
      "telephone": "+34611626090",
      "email": "rechesphere@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ES"
      },
      "sameAs": [
        "https://www.instagram.com/rechesphere/",
        "https://www.tiktok.com/@rechesphere",
        "https://www.facebook.com/profile.php?id=61573847093072"
      ],
      "description": description,
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+34611626090",
        "contactType": "sales",
        "email": "rechesphere@gmail.com",
        "availableLanguage": ["Es", "En"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // We don't remove meta tags to avoid flickering, 
      // but we MUST remove the schema script to prevent duplicates on navigation
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [title, description, image, url]);

  return null;
};

export default Seo;
