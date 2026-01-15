
import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Users, Target, Lightbulb, TrendingUp, HeartHandshake, ShieldCheck, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Configuración para el hover suave de las tarjetas
  const cardHoverProps = {
    whileHover: { 
      y: -12, 
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" 
    },
    transition: { 
      type: "spring" as const, 
      stiffness: 200, 
      damping: 25,
      mass: 1
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section with Aurora Effect */}
        <section className="relative bg-white py-24 overflow-hidden">
          {/* CSS for Aurora Animation */}
          <style>{`
            @keyframes aurora {
              from {
                background-position: 50% 50%, 50% 50%;
              }
              to {
                background-position: 350% 50%, 350% 50%;
              }
            }
          `}</style>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {/* Aurora Background Layer */}
             <div 
               className="absolute inset-0 opacity-60"
               style={{
                 backgroundImage: `repeating-linear-gradient(100deg, 
                    #FFFFFF 0%, 
                    #FFFFFF 7%, 
                    transparent 10%, 
                    transparent 35%, 
                    #60A5FA 40%, 
                    #2DD4BF 50%, 
                    #818CF8 60%, 
                    transparent 65%, 
                    #FFFFFF 95%
                  )`,
                 backgroundSize: "350% 200%",
                 filter: "blur(60px)",
                 animation: "aurora 60s linear infinite",
                 willChange: "background-position"
               }}
             />
             
             {/* Secondary subtler layer for depth */}
             <div 
               className="absolute inset-0 opacity-40 mix-blend-multiply"
               style={{
                 backgroundImage: `repeating-linear-gradient(100deg, 
                    #FFFFFF 0%, 
                    transparent 20%, 
                    #93C5FD 40%, 
                    #0B72FF 50%, 
                    transparent 60%, 
                    #FFFFFF 100%
                  )`,
                 backgroundSize: "350% 200%",
                 filter: "blur(80px)",
                 animation: "aurora 45s linear infinite reverse",
                 willChange: "background-position"
               }}
             />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <button onClick={() => navigate('/')} className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-4 block">Sobre Nosotros</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-secondary mb-6 leading-tight">
                  Una agencia construida para <span className="text-primary relative inline-block">
                    resultados reales
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>, no para likes.
                </h1>
            </motion.div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-16 lg:gap-24"
          >
            
            {/* Block 1: Origin & Vision */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <motion.div variants={itemVariants} className="order-2 md:order-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl transform rotate-3 opacity-10"></div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10">
                    <Lightbulb className="w-12 h-12 text-amber-400 mb-6" />
                    <h3 className="text-2xl font-bold text-secondary mb-4">Nuestra Visión</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      RecheSphere nace con una idea clara: ayudar a los negocios a crecer de forma sólida y medible. No creemos en promesas vacías ni en estrategias genéricas. Creemos en sistemas que funcionan, decisiones basadas en datos y un trabajo bien hecho que se siente en la facturación, no solo en el feed.
                    </p>
                  </div>
               </motion.div>
               <motion.div variants={itemVariants} className="order-1 md:order-2 pl-0 md:pl-10">
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-secondary mb-6">
                    Más allá de la superficie.
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                         <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary">Objetivos Claros</h4>
                        <p className="text-sm text-gray-500">Sin métricas de vanidad. Solo KPIs de negocio.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                         <ShieldCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary">Transparencia Total</h4>
                        <p className="text-sm text-gray-500">Sabrás exactamente dónde va cada euro.</p>
                      </div>
                    </div>
                  </div>
               </motion.div>
            </div>

            {/* Block 2: The Team */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <motion.div variants={itemVariants} className="pr-0 md:pr-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-4">
                    <Users className="w-3 h-3 mr-2" /> EL EQUIPO
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-secondary mb-6">
                    Jóvenes, especialistas y obsesionados.
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    Somos un equipo joven, especializado y obsesionado con entender cómo piensa el consumidor actual. Analizamos comportamientos, estudiamos tendencias y diseñamos estrategias que combinan creatividad, tecnología y una ejecución precisa.
                  </p>
                  <p className="text-gray-600 font-medium">
                    Nuestra misión es simple: convertir atención en clientes, y clientes en crecimiento sostenido.
                  </p>
               </motion.div>
               <motion.div variants={itemVariants} className="relative h-80 md:h-96">
                  {/* Abstract Visual Representation of Team/Data */}
                  <div className="absolute inset-0 bg-gray-100 rounded-2xl overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"></div>
                     <img 
                       src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                       alt="Equipo trabajando" 
                       className="w-full h-full object-cover mix-blend-overlay opacity-50"
                     />
                     <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center gap-4">
                           <div className="flex -space-x-3">
                              {[1,2,3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gray-600"></div>
                              ))}
                           </div>
                           <span className="text-sm font-medium text-gray-300">+ Expertos asociados</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* Block 3: Methodology Cards */}
            <motion.div variants={itemVariants}>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-secondary mb-4">
                  Nuestra Filosofía
                </h2>
                <p className="text-gray-600">
                  Trabajamos de manera cercana, transparente y con un enfoque totalmente personalizado.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div 
                  {...cardHoverProps}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-default"
                >
                   <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                      <HeartHandshake className="w-6 h-6 text-teal-600" />
                   </div>
                   <h4 className="text-xl font-bold text-secondary mb-3">Trato Personalizado</h4>
                   <p className="text-gray-600 text-sm leading-relaxed">
                     Cada empresa es un mundo. Adaptamos nuestras herramientas, procesos y recursos a lo que tu negocio realmente necesita. No existen fórmulas copiadas.
                   </p>
                </motion.div>
                
                <motion.div 
                  {...cardHoverProps}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-default"
                >
                   <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                      <Target className="w-6 h-6 text-indigo-600" />
                   </div>
                   <h4 className="text-xl font-bold text-secondary mb-3">Sistemas Propios</h4>
                   <p className="text-gray-600 text-sm leading-relaxed">
                     Construimos sistemas propios que encajan contigo. Creemos en la mejora continua, en el análisis profundo y en la optimización constante.
                   </p>
                </motion.div>

                <motion.div 
                  {...cardHoverProps}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-default"
                >
                   <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-6">
                      <TrendingUp className="w-6 h-6 text-rose-600" />
                   </div>
                   <h4 className="text-xl font-bold text-secondary mb-3">Crecimiento Estable</h4>
                   <p className="text-gray-600 text-sm leading-relaxed">
                     Ofrecemos resultados estables, escalables y predecibles. Nos implicamos en tu crecimiento como si fuera el nuestro.
                   </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
           
           <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-6">
                ¿Listo para trabajar con un socio estratégico?
              </h2>
              <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                RecheSphere no es solo una agencia digital: es el partner que estabas buscando para escalar.
              </p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/contacto')}
                className="text-lg px-8 py-4"
              >
                Hablemos de tu negocio <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
           </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
