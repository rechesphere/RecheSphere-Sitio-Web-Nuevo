
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../UI/Button';
import DarkVeil from '../UI/DarkVeil';

const points = [
  {
    id: "01",
    title: "Incertidumbre",
    text: "Tienes un negocio pero no sabes cómo conseguir más clientes de manera constante."
  },
  {
    id: "02",
    title: "Estancamiento",
    text: "Has probado diferentes estrategias de marketing sin obtener los resultados esperados."
  },
  {
    id: "03",
    title: "Gasto sin Retorno",
    text: "Sientes que gastas dinero en publicidad sin ver un retorno real de la inversión (ROAS)."
  },
  {
    id: "04",
    title: "Desorientación",
    text: "Quieres hacer crecer tu negocio pero no sabes por dónde empezar con el marketing digital."
  }
];

const PainPoints: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-[#0F1115] text-white relative overflow-hidden font-display">
      
      {/* Dark Veil Background Animation */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
          >
            ¿Te identificas con esto?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent font-bold italic"
          >
            Esto es para ti si...
          </motion.p>
        </div>

        {/* Interactive Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {points.map((point, index) => (
            <motion.div
              key={point.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate('/contacto')}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 cursor-pointer"
            >
              {/* Active Border Gradient */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 ${hoveredIndex === index ? 'border-[#C4B5A0]/30' : ''}`} />

              <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                {/* Number Styling */}
                <div className="relative">
                  <span 
                    className={`text-6xl font-bold transition-all duration-500 leading-none select-none ${
                      hoveredIndex === index 
                        ? 'text-[#C4B5A0] translate-x-2' 
                        : 'text-transparent stroke-text opacity-30'
                    }`}
                    style={{ 
                      WebkitTextStroke: hoveredIndex === index ? '0px' : '1px rgba(255,255,255,0.5)' 
                    }}
                  >
                    {point.id}
                  </span>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${hoveredIndex === index ? 'text-white' : 'text-gray-400'}`}>
                    {point.title}
                  </h4>
                  <p className={`text-base leading-relaxed transition-colors duration-300 ${hoveredIndex === index ? 'text-gray-200' : 'text-gray-500'}`}>
                    {point.text}
                  </p>
                </div>
              </div>
              
              {/* Corner Decoration */}
              <div className={`absolute top-4 right-4 transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  <ArrowRight className="text-[#C4B5A0] w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block relative group">
            {/* Glow effect behind button - Adjusted to Blue/Cyan */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            
            <Button 
              onClick={() => navigate('/contacto')}
              className="relative !bg-[#1A1A1A] !border !border-blue-500/50 !text-blue-400 hover:!text-white hover:!bg-primary !px-10 !py-4 !text-lg !rounded-lg !font-bold tracking-wide overflow-hidden"
            >
              <span className="relative z-10">Contacto</span>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PainPoints;
