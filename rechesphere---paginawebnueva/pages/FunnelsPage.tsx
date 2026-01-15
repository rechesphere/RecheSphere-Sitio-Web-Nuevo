
import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Zap, Filter, Search, RefreshCw, ChevronRight, Layers, ArrowDown, GitMerge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Seo from '../components/SEO/Seo';

const FunnelsPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col relative overflow-hidden font-sans">
      <Seo 
        title="Embudos de Venta Automatizados | RecheSphere"
        description="Convertimos visitas en clientes de forma automática. Diseño de funnels, landing pages de alta conversión y secuencias de email marketing."
      />

      {/* --- BACKGROUND ANIMADO --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Moving Grid - Direction Downwards for 'Funnel' effect */}
         <div 
           className="absolute inset-0 opacity-[0.15]" 
           style={{ 
             backgroundImage: 'linear-gradient(#00D4B8 1px, transparent 1px), linear-gradient(to right, #00D4B8 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             animation: 'moveGrid 20s linear infinite'
           }} 
         />
         <style>{`
            @keyframes moveGrid {
              0% { transform: translateY(-40px); }
              100% { transform: translateY(0); }
            }
         `}</style>

         {/* Floating Blobs (Cyan/Amber theme) */}
         <motion.div 
           animate={{ 
             x: [0, 80, 0], 
             y: [0, 50, 0],
             scale: [1, 1.2, 1] 
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
           className="absolute top-20 left-20 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[100px] mix-blend-multiply"
         />
         <motion.div 
           animate={{ 
             x: [0, -60, 0], 
             y: [0, -40, 0],
             scale: [1, 1.3, 1] 
           }}
           transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1 }}
           className="absolute bottom-40 right-20 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[100px] mix-blend-multiply"
         />
      </div>

      <Header />
      
      <main className="flex-grow pt-32 pb-20 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex flex-col items-center text-center">
            
            {/* Animated 3D Funnel Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
              className="relative mb-10 group cursor-pointer"
            >
               {/* Central Funnel */}
               <div className="relative z-20 w-32 h-32 bg-gradient-to-b from-white to-teal-50 rounded-3xl flex items-center justify-center shadow-2xl border border-white/80 group-hover:scale-105 transition-transform duration-300">
                  <Filter className="w-16 h-16 text-accent drop-shadow-lg" />
                  
                  {/* Flowing particles animation */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2">
                     <motion.div animate={{ y: [0, 60], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-gray-400 rounded-full"></motion.div>
                     <motion.div animate={{ y: [0, 60], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="w-2 h-2 bg-gray-400 rounded-full"></motion.div>
                     <motion.div animate={{ y: [0, 60], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="w-2 h-2 bg-gray-400 rounded-full"></motion.div>
                  </div>
                  
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                     <motion.div animate={{ y: [0, 20], opacity: [1, 0], scale: [1, 1.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/50"></motion.div>
                  </div>
               </div>

               {/* Background Glow */}
               <div className="absolute inset-0 bg-accent/30 rounded-full blur-3xl -z-10 group-hover:blur-[60px] transition-all duration-500"></div>
            </motion.div>

            {/* Typography */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl"
            >
               <button onClick={() => navigate('/')} className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors text-sm font-medium bg-white/50 px-4 py-2 rounded-full border border-white/50 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </button>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-secondary mb-6 leading-tight tracking-tight">
                Embudos de Venta <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-600">Automatizados</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Diseñamos recorridos digitales que transforman curiosos en clientes, paso a paso, mientras tú duermes.
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
            viewport={{ once: true }}
            className="grid gap-12 lg:gap-24"
          >
            {/* Block 1: Strategy / Design */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
                
                <div className="relative z-10">
                    <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                    <Search className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Diseño Estratégico</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                    Todo comienza definiendo qué debe sentir y entender el usuario. Diseñamos una secuencia lógica: páginas de aterrizaje persuasivas, formularios sin fricción y mensajes que resuelven dudas antes de que aparezcan. No es suerte, es psicología aplicada a la venta.
                    </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                 <div className="relative w-full aspect-square max-w-sm">
                    {/* Abstract Visual: Magnifying Glass / Blueprint */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-orange-100 rounded-[2rem] transform rotate-6 opacity-60 blur-lg group-hover:rotate-12 transition-transform duration-500"></div>
                    <div className="relative h-full bg-white rounded-[2rem] shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                        <Search className="w-32 h-32 text-amber-400 opacity-20 absolute -bottom-4 -right-4" />
                        
                        <div className="space-y-4 w-2/3">
                            <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                            <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                            <div className="h-20 bg-amber-50 rounded-xl border border-amber-100 w-full mt-4 flex items-center justify-center text-amber-500 font-mono text-xs">Wireframe Approved</div>
                        </div>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Block 2: Architecture / Flow */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="relative flex justify-center">
                 <div className="absolute inset-0 bg-gradient-to-bl from-teal-200 to-emerald-200 rounded-[2rem] transform -rotate-3 scale-105 opacity-50 blur-lg group-hover:-rotate-6 transition-transform duration-500"></div>
                 <div className="relative w-full max-w-sm bg-white rounded-[2rem] p-6 shadow-2xl border-4 border-white/80 group-hover:-translate-y-2 transition-transform duration-500">
                    {/* Flowchart visual */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 font-bold border border-gray-200">TRAFFIC</div>
                        <ArrowDown className="w-4 h-4 text-gray-300" />
                        <div className="w-full h-16 bg-teal-50 rounded-lg flex items-center justify-center text-sm text-teal-600 font-bold border border-teal-100 shadow-sm">LANDING PAGE</div>
                        <div className="h-8 w-0.5 bg-gray-300"></div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="h-12 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center text-[10px] text-red-400">Exit</div>
                            <div className="h-12 bg-green-50 rounded-lg border border-green-100 flex items-center justify-center text-[10px] text-green-500 font-bold shadow-sm">CHECKOUT</div>
                        </div>
                    </div>
                 </div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
                <div className="relative z-10">
                    <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <GitMerge className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Arquitectura Sin Fugas</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                    Construimos un ecosistema conectado. Desde el anuncio, pasando por la página de captura, hasta la secuencia de email y el cierre de venta. Eliminamos puntos de fricción para que el camino del usuario sea tan suave que comprar sea la consecuencia natural.
                    </p>
                </div>
              </div>
            </motion.div>

            {/* Block 3: Optimization */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
                <div className="relative z-10">
                    <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-180 transition-transform duration-700">
                    <RefreshCw className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Optimización Viva</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                    Un embudo nunca está "terminado". Analizamos dónde hace clic la gente, dónde se detienen y dónde abandonan. Con esos datos, ajustamos textos, colores y ofertas semana a semana para exprimir cada euro de inversión y maximizar el retorno.
                    </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                 <div className="relative w-full aspect-square max-w-sm bg-white rounded-[2rem] border border-gray-100 shadow-xl flex items-center justify-center overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="absolute inset-0 bg-green-50/30"></div>
                    
                    {/* Circle Chart Visual */}
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                            <motion.circle 
                                initial={{ strokeDasharray: "440", strokeDashoffset: "440" }}
                                whileInView={{ strokeDashoffset: "100" }}
                                transition={{ duration: 2, delay: 0.5 }}
                                cx="80" cy="80" r="70" 
                                stroke="#10b981" 
                                strokeWidth="12" 
                                fill="none" 
                                strokeLinecap="round" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-800">78%</span>
                            <span className="text-xs text-green-600 font-bold uppercase">Conv. Rate</span>
                        </div>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Block 4: CTA Card */}
            <motion.div 
              variants={itemVariants} 
              className="mt-12 relative rounded-[2.5rem] p-10 md:p-16 text-white overflow-hidden shadow-2xl text-center md:text-left"
            >
              {/* Dark Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black z-0" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0 bg-white/10 p-6 rounded-full backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(0,212,184,0.3)]">
                   <Layers className="w-12 h-12 text-accent" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 font-display">Tu máquina de ventas</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                    Deja de perseguir clientes y empieza a atraerlos. Construyamos un sistema que trabaje por ti las 24 horas del día.
                  </p>
                  <Button 
                    variant="primary" 
                    className="!bg-accent !text-secondary hover:!bg-teal-400 !px-8 !py-4 !text-lg !font-bold shadow-lg shadow-accent/20"
                    onClick={() => navigate('/contacto')}
                  >
                    Quiero mi embudo automatizado <ChevronRight className="ml-2 w-5 h-5" />
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

export default FunnelsPage;
