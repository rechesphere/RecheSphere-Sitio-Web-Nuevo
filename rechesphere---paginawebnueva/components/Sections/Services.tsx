
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { SERVICES } from '../../constants';
import { Service } from '../../types';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const navigate = useNavigate();

  const handleServiceClick = (service: Service) => {
    if (service.id === 'meta-ads') {
      navigate('/meta-ads');
    } else if (service.id === 'embudos') {
      navigate('/embudos');
    } else if (service.id === 'social-growth') {
      navigate('/gestion-estrategica');
    } else {
      setSelectedService(service);
    }
  };

  return (
    <section id="servicios" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary font-display mb-4">
            Servicios diseñados para crecer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            No vendemos "likes" ni "engagement". Vendemos sistemas que generan facturación.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
              onClick={() => handleServiceClick(service)}
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 ease-out">
                <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 flex-grow">
                {service.shortDesc}
              </p>
              
              <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform">
                Ver más
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal (Fallback for unhandled IDs) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
              onClick={() => setSelectedService(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                    <selectedService.icon className="w-7 h-7 text-primary" />
                  </div>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X />
                  </button>
                </div>

                <h3 className="text-3xl font-bold text-secondary mb-4 font-display">
                  {selectedService.title}
                </h3>
                
                <div className="prose prose-blue max-w-none mb-8">
                  <p className="text-lg text-gray-600">
                    {selectedService.fullDesc}
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-600">
                    <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        Estrategia a medida
                    </li>
                    <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        Reportes semanales
                    </li>
                    <li className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        Optimización continua
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button variant="outline" onClick={() => setSelectedService(null)}>
                    Cerrar
                  </Button>
                  <Button onClick={() => {
                    setSelectedService(null);
                    navigate('/contacto');
                  }}>
                    Me interesa
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
