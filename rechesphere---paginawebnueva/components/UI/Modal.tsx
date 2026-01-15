import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarCheck, Phone } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export const SuccessModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  userData?: { name: string; email: string; phone: string; interest?: string }
}> = ({ isOpen, onClose, userData }) => {
  
  const handleScheduling = () => {
    let url = 'https://cal.com/rechesphere/15min';
    
    // Pre-rellenar datos en Cal.com si están disponibles
    if (userData) {
      const params = new URLSearchParams();
      if (userData.name) params.append('name', userData.name);
      if (userData.email) params.append('email', userData.email);
      
      // Añadimos teléfono e interés en las notas para tener contexto
      const notes = `Teléfono: ${userData.phone}. Interés: ${userData.interest || 'No especificado'}`;
      params.append('notes', notes);
      
      url = `${url}?${params.toString()}`;
    }
    
    window.open(url, '_blank');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Phone className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-2xl font-bold text-secondary mb-2 font-display">
          ¡Solicitud recibida!
        </h3>
        
        <p className="text-gray-600 mb-8">
          Hemos recibido tus datos correctamente. El siguiente paso es agendar una breve llamada de 15 minutos para conocernos y ver cómo podemos ayudarte.
        </p>

        <div className="space-y-3">
          <Button fullWidth onClick={handleScheduling} className="flex items-center justify-center gap-2">
            <CalendarCheck className="w-4 h-4" />
            Agendar llamada ahora
          </Button>
          
          <button 
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Volver a la web
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;