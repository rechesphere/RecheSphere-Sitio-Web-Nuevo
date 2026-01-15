
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const TestimonialSpotlight: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Side with Dynamic Pulse */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Pulsing Rings */}
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-4 bg-accent/10 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
              
              {/* Main Image */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-secondary shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80" 
                  alt="CEO Proyectos Reches" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Floating Verified Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-white text-secondary px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-gray-100"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-50" />
                <span className="font-bold text-sm">Cliente Verificado</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Quote className="w-12 h-12 text-accent mb-6 mx-auto lg:mx-0 opacity-80" />
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed font-display mb-8">
                "No tenía ni idea de marketing digital y me arrepiento de haber tardado tanto. Gracias a <span className="text-primary">RecheSphere</span>, atraigo clientes todos los meses sin tener que buscarlos."
              </h3>

              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="text-center lg:text-left">
                  <p className="text-xl font-bold text-white">CEO de Proyectos Reches</p>
                  <p className="text-gray-400 text-sm">49 años • Sector Reformas</p>
                </div>
                
                <div className="h-px w-12 bg-gray-700 hidden lg:block"></div>

                <Button 
                  variant="primary"
                  className="!bg-accent !text-secondary hover:!bg-accent/90 shadow-[0_0_20px_rgba(0,212,184,0.3)]"
                  onClick={() => navigate('/contacto')}
                >
                  Quiero resultados así <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSpotlight;
