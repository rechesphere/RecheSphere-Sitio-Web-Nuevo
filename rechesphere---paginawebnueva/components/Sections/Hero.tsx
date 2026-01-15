
import React, { useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import LeadForm from '../UI/LeadForm';

const Hero: React.FC = () => {
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // OPTIMIZACIÓN: Solo escuchar evento en desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Check rápido de ancho de pantalla para evitar cálculos en tablets/móviles si el evento se dispara
    if (window.innerWidth < 1024) return;
    
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Create a dynamic gradient that follows the mouse
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(11, 114, 255, 0.08),
      transparent 80%
    )
  `;

  // A second, smaller highlight for the "core" of the light
  const highlight = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      rgba(0, 212, 184, 0.05),
      transparent 80%
    )
  `;

  return (
    <section 
      className="relative pt-32 pb-12 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen lg:min-h-[90vh] flex flex-col lg:flex-row lg:items-center items-start bg-neutral-50/50"
      onMouseMove={handleMouseMove}
    >
      {/* --- Background Layers --- */}
      
      {/* 1. Static Grid Pattern (Cheap to render) */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(to right, #cbd5e1 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          willChange: 'transform' // GPU hint
        }} 
      >
         {/* Fade out grid edges */}
         <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80" />
      </div>

      {/* 2. Interactive Spotlight - OCULTO EN MÓVIL/TABLET PARA RENDIMIENTO */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        style={{ background: background }}
      />
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        style={{ background: highlight }}
      />

      {/* 3. Static Decorative Blobs - Reduced Blur on Mobile */}
      <div className="absolute top-0 right-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-blue-100/40 rounded-full blur-2xl lg:blur-3xl -translate-y-1/2 translate-x-1/4 -z-10" />
      <div className="absolute bottom-0 left-0 w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] bg-accent/5 rounded-full blur-2xl lg:blur-3xl translate-y-1/3 -translate-x-1/4 -z-10" />


      {/* --- Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 lg:space-y-8 relative text-center lg:text-left"
          >
            {/* Subtle decorative line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-4 lg:mb-6 mx-auto lg:mx-0 hidden lg:block"
            />

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-secondary leading-tight tracking-tight">
              Consigue clientes <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">predecibles</span> con campañas que convierten.
            </h1>
            
            <p className="text-base md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Estrategias personalizadas de Meta Ads, embudos y gestión de redes para transformar inversión en ventas reales.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-6 pt-4">
               <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium text-gray-600 bg-white/80 px-3 py-2 md:px-4 rounded-full border border-gray-100 shadow-sm backdrop-blur-sm">
                 <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                 <span>Resultados medibles</span>
               </div>
               <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium text-gray-600 bg-white/80 px-3 py-2 md:px-4 rounded-full border border-gray-100 shadow-sm backdrop-blur-sm">
                 <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                 <span>Sin permanencia</span>
               </div>
               <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium text-gray-600 bg-white/80 px-3 py-2 md:px-4 rounded-full border border-gray-100 shadow-sm backdrop-blur-sm">
                 <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                 <span>Sin compromiso</span>
               </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-0 lg:mt-0 w-full max-w-md mx-auto lg:max-w-none lg:mx-0"
          >
            {/* OPTIMIZACIÓN: backdrop-blur reducido en móvil para evitar lag al escribir */}
            <div className="bg-white/80 backdrop-blur-md lg:backdrop-blur-xl p-4 md:p-8 rounded-3xl shadow-2xl border border-white/60 relative z-10 gpu-accelerated">
              <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-3xl pointer-events-none" />
              
              <div className="relative z-20">
                <h3 className="text-lg md:text-xl font-bold text-secondary mb-1">
                  Solicita tu estrategia gratuita
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-6">
                  Descubre el potencial oculto de tu negocio en 24h.
                </p>
                <LeadForm />
              </div>
            </div>
            
            {/* Static decorations - Hidden on mobile to reduce layer count */}
            <div className="absolute -top-12 -right-12 w-32 h-32 border-2 border-dashed border-accent/20 rounded-full hidden lg:block opacity-60" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/5 rounded-full blur-xl hidden lg:block" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
