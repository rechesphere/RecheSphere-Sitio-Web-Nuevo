
import React, { useState } from 'react';
import { Play, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const VIDEO_ID = "mhALPTIStHM";

  return (
    <section className="py-24 relative overflow-hidden">
       {/* --- FONDOS Y FUSIÓN --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50/30" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-1/2 w-[1px] bg-gradient-to-b from-blue-200/50 to-transparent hidden lg:block" />

      {/* Blobs "Cálidos" */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[90px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[90px] mix-blend-multiply" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Títulos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
           <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-semibold tracking-wide uppercase">
            Quiénes somos
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary font-display mb-6 tracking-tight">
            Presentación RecheSphere
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans">
            ¿Listo para llevar tu negocio al siguiente nivel? Esta breve presentación de RecheSphere te revelará nuestras claves para atraer clientes, potenciar tu marca online y optimizar tus ventas.
          </p>
        </motion.div>

        {/* Contenedor del Vídeo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white ring-1 ring-gray-100"
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
                  alt="Presentación RecheSphere" 
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
                    {/* Simplified pulse for mobile smoothness */}
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" style={{ animationDuration: '2s' }}></div>
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary fill-current relative z-10" />
                  </motion.div>
                </div>
                
                <div className="absolute bottom-8 left-0 right-0 text-center">
                   <span className="inline-block px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors">
                      Ver presentación completa
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
                title="Presentación RecheSphere"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* CTA BUTTON AREA */}
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
                className="relative group overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-xl flex items-center gap-3 z-10 text-lg"
            >
                <span className="relative z-10 tracking-wide">Solicitar Auditoría Ahora</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out z-0" />
            </motion.button>

            <a 
                href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
            >
                <span>Ver en YouTube si hay problemas de reproducción</span>
                <ExternalLink size={14} />
            </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
