
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobar si ya existe una decisión guardada
    const consent = localStorage.getItem('cookieConsent');
    
    // Si no existe decisión, mostramos el banner con un pequeño retraso para que sea elegante
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 z-[9999] max-w-sm w-[calc(100%-2rem)] md:w-auto"
        >
          <div className="bg-white/90 backdrop-blur-xl border border-white/50 p-5 rounded-2xl shadow-2xl shadow-black/10 relative overflow-hidden">
            
            {/* Decoración de fondo sutil */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="bg-blue-50 p-2.5 rounded-xl text-primary shrink-0">
                <Cookie size={24} />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    Valoramos tu privacidad
                    <ShieldCheck size={14} className="text-green-500" />
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. 
                    <button 
                      onClick={() => navigate('/cookies')}
                      className="text-primary hover:underline ml-1 font-medium"
                    >
                      Ver política
                    </button>.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAccept}
                    className="bg-primary hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md active:scale-95 transform duration-200"
                  >
                    Aceptar todas
                  </button>
                  <button
                    onClick={handleDecline}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-lg transition-colors active:scale-95 transform duration-200"
                  >
                    Rechazar
                  </button>
                </div>
              </div>

              {/* Botón cerrar discreto */}
              <button 
                onClick={handleDecline}
                className="text-gray-400 hover:text-gray-600 transition-colors -mt-1 -mr-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
