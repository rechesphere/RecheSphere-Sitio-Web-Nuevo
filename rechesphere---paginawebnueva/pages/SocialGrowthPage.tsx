
import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Megaphone, PenTool, BarChart2, TrendingUp, ChevronRight, MessageCircle, Heart, Share2, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Seo from '../components/SEO/Seo';

const SocialGrowthPage: React.FC = () => {
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
        title="Gestión de Redes Estratégica | RecheSphere"
        description="Contenido que construye autoridad. Estrategia de contenidos, calendarios editoriales y crecimiento orgánico alineado con ventas."
      />

      {/* --- BACKGROUND ANIMADO (Estilo Creativo/Social) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Moving Grid - Tilted slightly for dynamism */}
         <div 
           className="absolute inset-0 opacity-[0.15]" 
           style={{ 
             backgroundImage: 'linear-gradient(#A855F7 1px, transparent 1px), linear-gradient(to right, #A855F7 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             animation: 'moveGrid 25s linear infinite'
           }} 
         />
         <style>{`
            @keyframes moveGrid {
              0% { transform: translate(0, 0); }
              100% { transform: translate(40px, 40px); }
            }
         `}</style>

         {/* Floating Blobs (Purple/Pink theme) */}
         <motion.div 
           animate={{ 
             x: [0, 90, 0], 
             y: [0, -60, 0],
             scale: [1, 1.2, 1] 
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
           className="absolute top-0 right-20 w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-[100px] mix-blend-multiply"
         />
         <motion.div 
           animate={{ 
             x: [0, -80, 0], 
             y: [0, 70, 0],
             scale: [1, 1.3, 1] 
           }}
           transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1 }}
           className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-[100px] mix-blend-multiply"
         />
      </div>

      <Header />
      
      <main className="flex-grow pt-32 pb-20 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex flex-col items-center text-center">
            
            {/* Animated 3D Icon Container */}
            <motion.div
              initial={{ scale: 0, rotate: 15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
              className="relative mb-10 group cursor-pointer"
            >
               {/* Central Icon */}
               <div className="relative z-20 w-32 h-32 bg-gradient-to-br from-white to-purple-50 rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/80 group-hover:scale-110 transition-transform duration-300">
                  <Megaphone className="w-16 h-16 text-purple-600 drop-shadow-lg -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
               </div>

               {/* Sound Waves / Social Particles */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <motion.div animate={{ x: [20, 50], y: [-20, -40], opacity: [1, 0], scale: [0.5, 1.2] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-0 right-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shadow-sm text-pink-500"><Heart size={14} fill="currentColor" /></motion.div>
                  <motion.div animate={{ x: [20, 60], y: [10, 20], opacity: [1, 0], scale: [0.5, 1.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-0 right-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-sm text-blue-500"><Share2 size={14} /></motion.div>
                  <motion.div animate={{ x: [-20, -50], y: [-10, -30], opacity: [1, 0], scale: [0.5, 1.2] }} transition={{ duration: 2.2, repeat: Infinity, delay: 1 }} className="absolute top-0 left-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shadow-sm text-purple-500"><MessageCircle size={14} /></motion.div>
               </div>

               {/* Background Glow */}
               <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl -z-10 group-hover:blur-[60px] transition-all duration-500"></div>
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
                Gestión Estratégica <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">de Redes</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Contenido que construye autoridad, mueve audiencias y apoya tus objetivos de ventas. No publicamos por publicar.
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
            {/* Block 1: Strategy / Calendar */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
                <div className="relative z-10">
                    <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                    <PenTool className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Contenido con Propósito</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                    Empezamos desarrollando una estrategia a medida. Definimos pilares de contenido, tono y un calendario que mantenga coherencia sin perder frescura. Cada pieza (Reel, Carrusel o Story) cumple una función: educar, entretener o vender. Nada es aleatorio.
                    </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                 <div className="relative w-full aspect-square max-w-sm">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-pink-100 rounded-[2rem] transform rotate-6 opacity-60 blur-lg group-hover:rotate-12 transition-transform duration-500"></div>
                    <div className="relative h-full bg-white rounded-[2rem] shadow-2xl border-4 border-white flex flex-col items-center justify-center overflow-hidden p-6 gap-3 group-hover:-translate-y-2 transition-transform duration-500">
                        {/* Abstract Calendar Visual */}
                        <div className="w-full h-8 bg-purple-500 rounded-lg opacity-80 mb-2"></div>
                        <div className="grid grid-cols-3 gap-2 w-full">
                           <div className="h-20 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center"><Heart size={16} className="text-purple-300" /></div>
                           <div className="h-20 bg-pink-50 rounded-lg border border-pink-100 flex items-center justify-center"><MessageCircle size={16} className="text-pink-300" /></div>
                           <div className="h-20 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center"><Share2 size={16} className="text-blue-300" /></div>
                           <div className="h-20 bg-gray-50 rounded-lg border border-gray-100"></div>
                           <div className="h-20 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center"><Calendar size={16} className="text-purple-300" /></div>
                           <div className="h-20 bg-gray-50 rounded-lg border border-gray-100"></div>
                        </div>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Block 2: Reporting / Data */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="relative flex justify-center">
                 <div className="absolute inset-0 bg-gradient-to-bl from-blue-200 to-purple-200 rounded-[2rem] transform -rotate-3 scale-105 opacity-50 blur-lg group-hover:-rotate-6 transition-transform duration-500"></div>
                 <div className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl border-4 border-white/80 group-hover:-translate-y-2 transition-transform duration-500 flex items-center justify-center min-h-[300px]">
                    {/* Charts Visual */}
                    <div className="flex items-end gap-3 w-full h-40">
                       <motion.div initial={{ height: "20%" }} whileInView={{ height: "40%" }} transition={{ delay: 0.2 }} className="w-full bg-gray-100 rounded-t-lg"></motion.div>
                       <motion.div initial={{ height: "20%" }} whileInView={{ height: "60%" }} transition={{ delay: 0.4 }} className="w-full bg-purple-200 rounded-t-lg"></motion.div>
                       <motion.div initial={{ height: "20%" }} whileInView={{ height: "50%" }} transition={{ delay: 0.6 }} className="w-full bg-purple-300 rounded-t-lg"></motion.div>
                       <motion.div initial={{ height: "20%" }} whileInView={{ height: "80%" }} transition={{ delay: 0.8 }} className="w-full bg-purple-500 rounded-t-lg relative">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">+120%</div>
                       </motion.div>
                    </div>
                 </div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
                <div className="relative z-10">
                    <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <BarChart2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Análisis, no intuición</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                    Realizamos reportes periódicos donde analizamos métricas clave. No miramos solo "likes": interpretamos alcance, retención y clics en el enlace. Entendemos qué contenido atrae a curiosos y cuál atrae a compradores.
                    </p>
                </div>
              </div>
            </motion.div>

            {/* Block 3: Optimization / Growth */}
            <motion.div variants={itemVariants} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
                <div className="relative z-10">
                    <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-180 transition-transform duration-700">
                    <TrendingUp className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-secondary mb-4 font-display">Optimización Viva</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                    Adaptamos el contenido según la respuesta real del mercado. Si un formato funciona, lo escalamos. Si una temática aburre, la eliminamos. Es un proceso vivo que asegura que tu marca siempre se sienta relevante y fresca.
                    </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                 <div className="relative w-full aspect-square max-w-sm bg-white rounded-[2rem] border border-gray-100 shadow-xl flex items-center justify-center overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="absolute inset-0 bg-pink-50/30"></div>
                    
                    {/* Rocket Visual */}
                    <div className="relative">
                       <div className="absolute inset-0 bg-pink-400 blur-2xl opacity-20 animate-pulse"></div>
                       <TrendingUp className="w-40 h-40 text-pink-500 relative z-10" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black z-0" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0 bg-white/10 p-6 rounded-full backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                   <Megaphone className="w-12 h-12 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 font-display">Tu marca, amplificada</h3>
                  <p className="text-purple-100 text-lg leading-relaxed mb-8 max-w-2xl">
                    Deja de ser invisible. Construye una comunidad fiel que confíe en ti y quiera comprar lo que vendes.
                  </p>
                  <Button 
                    variant="primary" 
                    className="!bg-white !text-purple-900 hover:!bg-purple-50 !px-8 !py-4 !text-lg !font-bold shadow-lg"
                    onClick={() => navigate('/contacto')}
                  >
                    Quiero potenciar mi marca <ChevronRight className="ml-2 w-5 h-5" />
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

export default SocialGrowthPage;
