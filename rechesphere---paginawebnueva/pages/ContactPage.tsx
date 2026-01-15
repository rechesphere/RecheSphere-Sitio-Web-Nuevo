
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import LeadForm from '../components/UI/LeadForm';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Copy & Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-6 leading-tight">
                  Hablemos de cómo <span className="text-primary">escalar</span> tu negocio.
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Rellena el formulario para solicitar tu auditoría estratégica gratuita. Analizaremos tu situación actual y te propondremos un plan de acción claro y medible.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-lg">Sin compromiso</h4>
                    <p className="text-gray-500 text-sm">Recibe tu propuesta y decide con libertad.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-lg">Respuesta en 24h</h4>
                    <p className="text-gray-500 text-sm">Nuestro equipo revisará tus datos rápidamente.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Contacto Directo</h4>
                <div className="space-y-4">
                  <a href="mailto:rechesphere@gmail.com" className="flex items-center gap-3 text-secondary hover:text-primary transition-colors group">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    <span>rechesphere@gmail.com</span>
                  </a>
                  <a href="tel:+34611626090" className="flex items-center gap-3 text-secondary hover:text-primary transition-colors group">
                    <Phone className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    <span>+34 611 62 60 90</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative Blobs behind form */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-60" />

              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative z-10">
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  Solicita tu sesión
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Déjanos tus datos y te contactaremos para agendar.
                </p>
                
                <LeadForm />
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
