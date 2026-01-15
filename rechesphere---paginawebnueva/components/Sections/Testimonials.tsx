
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';

const Testimonials: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Creamos un set lo suficientemente grande para cubrir pantallas anchas antes de duplicar
  const baseSet = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  
  // Duplicamos el set base para crear el efecto de bucle infinito perfecto
  const carouselItems = [...baseSet, ...baseSet];

  return (
    <section id="casos" className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-secondary font-display mb-4"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Historias reales de negocios que escalaron con sistemas predecibles.
          </motion.p>
        </div>
      </div>

      {/* Contenedor del Carrusel */}
      <div 
        className="relative w-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)} // Pausar al tocar en móvil
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Máscaras de degradado */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-40 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-40 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        {/* Riel de animación */}
        <div 
          className="flex gap-4 md:gap-6 py-10"
          style={{
            width: "max-content",
            // Aumentamos tiempo en móvil (100s) para que parezca más lento visualmente al ser elementos más grandes en proporción
            animation: "scroll 100s linear infinite", 
            animationPlayState: isHovered ? 'paused' : 'running',
            willChange: "transform", // Forzar GPU
            backfaceVisibility: "hidden"
          }}
        >
          {carouselItems.map((t, index) => (
            <div
              key={`${t.id}-${index}`}
              className="w-[300px] md:w-[420px] flex-shrink-0 transform-gpu"
            >
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100/50 h-full relative group/card">
                {/* Icono de Cita Decorativo */}
                <div className="absolute top-6 right-6 text-primary/10 group-hover/card:text-primary/20 transition-colors duration-500">
                  <Quote size={40} fill="currentColor" stroke="none" aria-hidden="true" />
                </div>
                
                {/* Cabecera: Info Usuario */}
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="relative">
                    <img 
                      src={`${t.image}&w=60&h=60&q=80`} 
                      alt={`Foto de ${t.name}`}
                      width="56"
                      height="56"
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-4 ring-gray-50 group-hover/card:ring-primary/10 transition-all duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                       <div className="bg-green-500 w-2.5 h-2.5 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-secondary text-base md:text-lg leading-tight group-hover/card:text-primary transition-colors">
                      {t.name}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                      {t.role} @ <span className="font-medium text-gray-700">{t.company}</span>
                    </p>
                  </div>
                </div>
                
                {/* Cuerpo: Cita */}
                <div className="relative z-10 mb-6">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed italic text-sm md:text-[15px]">
                    "{t.quote}"
                  </p>
                </div>
                
                {/* Pie: Métrica */}
                <div className="pt-4 md:pt-6 border-t border-gray-100 flex justify-between items-center">
                  <div className="inline-flex items-center gap-2 bg-green-50/80 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-100/50 shadow-sm">
                    <TrendingUpIcon className="w-3.5 h-3.5" />
                    {t.metric}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  );
};

// Icono auxiliar para evitar conflictos de importación
const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default Testimonials;
