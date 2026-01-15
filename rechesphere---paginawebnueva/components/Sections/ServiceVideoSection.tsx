
import React, { useState } from 'react';
import { Play, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ServiceVideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const VIDEO_ID = "m8gZ6aY0Fco";

  return (
    <section className="py-24 relative overflow-hidden">
      {/* --- FONDOS --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-purple-50/30 to-white" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-200/50 to-blue-200/50 hidden lg:block" />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-[80px] mix-blend-multiply" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[80px] mix-blend-multiply" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Títulos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative"
        >
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-semibold tracking-wide uppercase">
            Descubre cómo trabajamos
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-display mb-6 tracking-tight">
            Nuestros servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans">
            ¿Quieres dominar el mundo digital? Este video presenta los servicios esenciales de marketing digital de RecheSphere. Desde campañas de Facebook Ads efectivas, hasta la gestión de redes y embudos de venta. Te ayudamos a crecer sin límites.
          </p>
        </motion.div>

        {/* Vídeo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 border-4 border-white ring-1 ring-gray-100"
        >
          <AnimatePresence mode='wait'>
            {!isPlaying ? (
              <motion.div 
                key="thumbnail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full group cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <img 
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`} 
                  alt="Nuestros Servicios RecheSphere" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 group-hover:from-black/70 transition-all duration-300" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg pl-2 relative z-10"
                  >
                    <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20" style={{ animationDuration: '2s' }}></div>
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-secondary fill-current relative z-10" />
                  </motion.div>
                </div>
                
                <div className="absolute bottom-8 left-0 right-0 text-center">
                   <span className="inline-block px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors">
                      Ver explicación de servicios
                   </span>
                </div>
              </motion.div>
            ) : (
              <motion.iframe
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="Nuestros Servicios RecheSphere"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* CTA */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-5"
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contacto')}
                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-10 rounded-full shadow-xl flex items-center gap-3 z-10 text-lg"
            >
                <span className="relative z-10 tracking-wide">Empezar Transformación</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out z-0" />
            </motion.button>

            <a 
                href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-600 transition-colors"
            >
                <span>Ver en YouTube si hay problemas de reproducción</span>
                <ExternalLink size={14} />
            </a>
        </motion.div>

        {/* Decoración */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-[120px] -z-10 rounded-full opacity-70 pointer-events-none"></div>

      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
    </section>
  );
};

export default ServiceVideoSection;
