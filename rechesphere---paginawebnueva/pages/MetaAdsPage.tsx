
import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Target, BrainCircuit, LineChart, Rocket, ChevronRight, Layers, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Seo from '../components/SEO/Seo';

const MetaAdsPage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Reduced stagger for faster load
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 }, // Reduced distance
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } // Simpler spring
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col relative overflow-hidden font-sans">
      <Seo 
        title="Meta Ads (Facebook & Instagram) | RecheSphere"
        description="Campañas de Meta Ads diseñadas para ROI. Segmentación inteligente, creatividades de alto impacto y optimización continua."
      />

      {/* --- BACKGROUND ANIMADO OPTIMIZADO --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Moving Grid - Simplified animation for mobile */}
         <div 
           className="absolute inset-0 opacity-[0.1]" 
           style={{ 
             backgroundImage: 'linear-gradient(#0B72FF 1px, transparent 1px), linear-gradient(to right, #0B72FF 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             // GPU Accelerated animation handled by CSS class or style
             willChange: 'transform'
           }} 
         />
         
         {/* Floating Blobs - HIDDEN ON MOBILE to save GPU */}
         <div className="hidden md:block">
            <motion.div 
            animate={{ 
                x: [0, 50, 0], // Reduced movement range
                y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-3xl mix-blend-multiply"
            />
            <motion.div 
            animate={{ 
                x: [0, -40, 0], 
                y: [0, 50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-300/20 rounded-full blur-3xl mix-blend-multiply"
            />
         </div>
      </div>

      <Header />
      
      <main className="flex-grow pt-32 pb-20 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex flex-col items-center text-center">
            
            {/* Animated 3D Icon Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block relative group cursor-pointer mb-8"
            >
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="w-28 h-28 bg-gradient-to-br from-white to-blue-50 rounded-3xl flex items-center justify-center shadow-xl relative z-10 border border-white/80 group-hover:scale-105 transition-transform duration-300">
                <Rocket className="w-14 h-14 text-primary group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              
              {/* Floating particles - Simplified */}
              <div className="absolute -top-2 -right-6 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shadow-sm z-0"><Target className="w-4 h-4 text-indigo-400" /></div>
              <div className="absolute -bottom-2 -left-6 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-sm z-0"><Layers className="w-5 h-5 text-blue-400" /></div>
            </motion.div>

            {/* Typography */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl"
            >
               <button onClick={() => navigate('/')} className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors text-sm font-medium bg-white/50 px-4 py-2 rounded-full border border-white/50 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </button>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-secondary mb-6 leading-tight tracking-tight">
                Meta Ads <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Inteligentes</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Transformamos la visibilidad en un flujo constante de clientes. Sin métricas de vanidad, solo ROI.
              </p>
            </motion.div>
          </div>
        </div>

        {/* --- CONTENT CARDS --- */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }} // Load earlier
            className="grid gap-12 lg:gap-24"
          >
            {/* Block 1: Analysis */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <BrainCircuit className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Análisis y Estrategia</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Primero, analizamos el negocio y definimos con claridad quién es el cliente ideal: qué busca, cómo piensa y qué mensajes le generan interés inmediato. A partir de ahí desarrollamos anuncios visualmente atractivos, con textos estratégicos y pruebas constantes para identificar qué ángulos generan mejores resultados.
                </p>
              </div>
              <div className="order-1 md:order-2 relative">
                {/* Static gradient blob instead of complex rotation for mobile performance */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-200 rounded-[2rem] transform rotate-3 scale-105 opacity-50 blur-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Estrategia de análisis" 
                  className="relative rounded-[2rem] shadow-xl w-full h-auto object-cover border-4 border-white/80"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>
            </motion.div>

            {/* Block 2: Segmentation */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                 <div className="absolute inset-0 bg-gradient-to-bl from-teal-200 to-emerald-200 rounded-[2rem] transform -rotate-3 scale-105 opacity-50 blur-lg"></div>
                 <div className="relative bg-white rounded-[2rem] h-80 flex items-center justify-center shadow-xl border-4 border-white/80 overflow-hidden">
                    <div className="absolute inset-0 bg-neutral-50 opacity-50" 
                         style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <Target className="w-32 h-32 text-accent opacity-90 drop-shadow-lg" />
                 </div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-teal-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Segmentación Láser</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  El siguiente paso es la segmentación. No trabajamos con públicos amplios al azar: utilizamos audiencias inteligentes, datos avanzados (Lookalike, Retargeting) y ajustes progresivos para que cada euro invertido impacte en personas con verdadera intención de compra.
                </p>
              </div>
            </motion.div>

            {/* Block 3: Monitoring */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <LineChart className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Optimización Continua</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Todo esto ocurre bajo una supervisión continua. Revisamos el rendimiento cada día, ajustamos la estructura de campañas y optimizamos creatividades (A/B Testing) para asegurar que los resultados no solo se mantengan, sino que mejoren semana a semana reduciendo el coste por adquisición.
                </p>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-[2rem] transform rotate-3 scale-105 opacity-50 blur-lg"></div>
                <div className="relative bg-white rounded-[2rem] p-8 h-full min-h-[300px] flex items-center justify-center shadow-xl border-4 border-white/80">
                     <div className="w-full space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                              <div className="bg-indigo-500 h-3 rounded-full w-[80%]"></div>
                           </div>
                           <span className="text-xs font-bold text-indigo-600">+124%</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                              <div className="bg-green-500 h-3 rounded-full w-[65%]"></div>
                           </div>
                           <span className="text-xs font-bold text-green-600">+85%</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                              <div className="bg-blue-500 h-3 rounded-full w-[90%]"></div>
                           </div>
                           <span className="text-xs font-bold text-blue-600">+200%</span>
                        </div>
                     </div>
                </div>
              </div>
            </motion.div>

            {/* Block 4: Result / CTA */}
            <motion.div 
              variants={itemVariants} 
              className="mt-12 relative rounded-[2.5rem] p-10 md:p-16 text-white overflow-hidden shadow-xl text-center md:text-left gpu-accelerated"
            >
              {/* Static Gradient Background for Mobile Performance */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-black z-0" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0 relative">
                    <div className="bg-white/10 p-6 rounded-full backdrop-blur-md border border-white/20 relative">
                       <Zap className="w-12 h-12 text-yellow-300" />
                    </div>
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 font-display">Resultados Predecibles</h3>
                  <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-2xl">
                    El resultado es un sistema que funciona en segundo plano, generando oportunidades nuevas de forma estable. Un método que parece sencillo desde fuera, pero que esconde una estrategia precisa detrás.
                  </p>
                  <Button 
                    variant="primary" 
                    className="!bg-white !text-blue-900 hover:!bg-blue-50 !px-8 !py-4 !text-lg !font-bold shadow-lg"
                    onClick={() => navigate('/contacto')}
                  >
                    Quiero implementar este sistema <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MetaAdsPage;
