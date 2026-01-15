
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { APP_NAME, NAV_ITEMS } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleContactClick = () => {
    navigate('/contacto');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        navigate('/', { state: { scrollTo: targetId } });
      }
    } else {
      navigate(href);
    }
    
    setIsMobileMenuOpen(false);
  };

  // Animation Variants - Optimized for Mobile
  const menuContainerVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2, // Faster
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05 // Reduced stagger delay for snappier feel
      }
    }
  };

  const menuItemVariants: Variants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center
        ${
          isScrolled
            ? 'top-4 left-0 right-0 mx-auto w-[94%] md:w-[85%] max-w-5xl bg-white/80 backdrop-blur-md md:backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5 rounded-full py-2 px-1'
            : 'top-0 left-0 right-0 w-full bg-transparent py-6'
        }
      `}
      style={{ willChange: 'transform, background-color' }}
    >
      <div className={`w-full transition-all duration-500 ${isScrolled ? 'px-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2 group relative z-50 focus:outline-none"
            aria-label="Ir al inicio"
          >
            <div 
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm transform transition-transform group-hover:scale-105"
              aria-hidden="true"
            >
              R
            </div>
            <span className={`font-display font-bold text-xl tracking-tight ${isScrolled ? 'text-secondary' : 'text-secondary'}`}>
              {APP_NAME}
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer relative group bg-transparent border-none p-0"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <button 
              onClick={handleContactClick}
              className={`inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${isScrolled ? 'py-1.5' : ''}`}
            >
              Solicitar estrategia
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 bg-white/60 backdrop-blur-md rounded-full hover:bg-white transition-all active:scale-90 relative z-50 border border-gray-200/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
             {/* Simple Icon Toggle without heavy AnimatePresence rotation on mobile if performance is key, but here we keep it simple */}
             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-full left-0 right-0 mt-3 mx-auto w-[94%] max-w-lg bg-white/95 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden md:hidden origin-top z-40"
            style={{ willChange: 'opacity, transform' }}
          >
            <nav className="px-2 pt-2 pb-2 space-y-1" aria-label="Menú móvil">
              {NAV_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={menuItemVariants}
                  onClick={() => handleNavClick(item.href)}
                  className="block px-4 py-4 text-lg font-medium text-gray-700 hover:text-primary hover:bg-blue-50/80 rounded-2xl cursor-pointer transition-colors active:bg-blue-50"
                >
                  <div className="flex justify-between items-center">
                    {item.label}
                    <ArrowRight className="w-4 h-4 opacity-30 -rotate-45" />
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                variants={menuItemVariants}
                className="pt-2 pb-2 px-2"
              >
                <button
                  onClick={handleContactClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-4 border border-transparent text-base font-medium rounded-2xl text-white bg-secondary active:bg-gray-800 shadow-lg active:scale-95 transition-all"
                >
                  Solicitar estrategia
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
