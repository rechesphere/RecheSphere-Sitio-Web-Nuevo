
import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Cookie, Shield, Eye, Settings, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';

const CookiePolicyPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Shield,
      title: "Cookies Esenciales",
      desc: "Son estrictamente necesarias para que la web funcione. Sin ellas, cosas como navegar o ver el contenido no serían posibles. No guardan información personal identificable.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: Eye,
      title: "Cookies de Análisis",
      desc: "Nos ayudan a entender cómo usas la web (qué páginas visitas más, cuánto tiempo te quedas...). Toda la información es anónima y la usamos solo para mejorar.",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      icon: Settings,
      title: "Cookies Funcionales",
      desc: "Permiten que la web recuerde tus preferencias, como tu idioma o si ya has aceptado este aviso de cookies, para que no te moleste cada vez que entras.",
      color: "text-teal-500",
      bg: "bg-teal-50"
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col relative overflow-hidden">
      
      {/* --- BACKGROUND ANIMADO --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Moving Grid */}
         <div 
           className="absolute inset-0 opacity-[0.15]" 
           style={{ 
             backgroundImage: 'linear-gradient(#0B72FF 1px, transparent 1px), linear-gradient(to right, #0B72FF 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             animation: 'moveGrid 20s linear infinite'
           }} 
         />
         <style>{`
            @keyframes moveGrid {
              0% { transform: translateY(0); }
              100% { transform: translateY(40px); }
            }
         `}</style>

         {/* Floating Blobs */}
         <motion.div 
           animate={{ 
             x: [0, 100, 0], 
             y: [0, -50, 0],
             scale: [1, 1.2, 1] 
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] mix-blend-multiply"
         />
         <motion.div 
           animate={{ 
             x: [0, -70, 0], 
             y: [0, 100, 0],
             scale: [1, 1.3, 1] 
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
           className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[100px] mix-blend-multiply"
         />
      </div>

      <Header />
      
      <main className="flex-grow pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
              className="inline-block relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg relative z-10 border border-gray-100 group-hover:scale-110 transition-transform duration-300"
              >
                <Cookie className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300" />
              </motion.div>
              
              {/* Floating crumbs */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-4 -right-4 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center shadow-sm z-20"><div className="w-2 h-2 bg-orange-300 rounded-full"></div></motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -bottom-2 -left-6 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center shadow-sm z-20"><div className="w-2 h-2 bg-blue-300 rounded-full"></div></motion.div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold font-display text-secondary mb-6 mt-8"
            >
              Política de Cookies
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              En RecheSphere nos gusta la transparencia. Aquí te explicamos qué son esas famosas "galletas", para qué las usamos y cómo tienes tú el control.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 mb-16"
          >
            {sections.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start group"
              >
                <div className={`${item.bg} p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2 flex items-center gap-2">
                    {item.title}
                    <CheckCircle2 className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Legal Text Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-blue-50/50 p-8 md:p-12 rounded-[2rem] border border-white shadow-lg mb-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-secondary mb-4 font-display">¿Puedo desactivarlas?</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  ¡Claro! Tienes el control total. Puedes desactivar las cookies directamente desde la configuración de tu navegador. Eso sí, ten en cuenta que algunas partes de la web podrían dejar de funcionar correctamente o ir un poco más lentas (como un coche sin ruedas... avanza, pero peor).
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/50 inline-block px-4 py-2 rounded-full border border-gray-100">
                   <span>Última actualización:</span>
                   <span className="font-medium text-gray-600">{new Date().toLocaleDateString()}</span>
                </div>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Button 
              onClick={() => navigate('/')}
              variant="secondary"
              className="inline-flex items-center group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al inicio
            </Button>
          </motion.div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
