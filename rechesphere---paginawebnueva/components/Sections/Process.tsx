import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../constants';

const Process: React.FC = () => {
  return (
    <section id="metodo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider text-sm uppercase"
          >
            Nuestro Método
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl md:text-4xl font-bold text-secondary font-display"
          >
            Cómo lo hacemos
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10 transform -translate-y-1/2" />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ translateY: -6 }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group relative"
            >
              <div className="w-16 h-16 mx-auto bg-white border-4 border-neutral-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-primary/20 transition-colors z-10 relative">
                 <step.icon className="w-8 h-8 text-primary" />
                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">
                   {step.id}
                 </div>
              </div>
              
              <h3 className="text-xl font-bold text-secondary mb-3 text-center">
                {step.title}
              </h3>
              <p className="text-gray-500 text-center leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;