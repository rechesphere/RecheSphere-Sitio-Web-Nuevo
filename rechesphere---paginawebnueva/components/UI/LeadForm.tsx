
import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { LeadForm as LeadFormType } from '../../types';
import { SuccessModal } from './Modal';
import { GOOGLE_SHEETS_WEBHOOK_URL } from '../../constants';

interface LeadFormProps {
  className?: string;
  onSuccess?: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  website?: string;
  interest?: string;
  privacyAccepted?: string;
}

const steps = [
  { id: 0, title: "Tu Objetivo" },
  { id: 1, title: "Tus Datos" },
  { id: 2, title: "Finalizar" }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute' as const // Fix layout shift during animation
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: 'relative' as const
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute' as const
  })
};

const LeadForm: React.FC<LeadFormProps> = ({ className = '', onSuccess }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const [formData, setFormData] = useState<LeadFormType>({
    fullName: '',
    email: '',
    phone: '',
    website: '',
    interest: '',
    privacyAccepted: false
  });
  
  const [submittedData, setSubmittedData] = useState<LeadFormType | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showModal, setShowModal] = useState(false);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (currentStep === 0) {
        if (!formData.interest) {
            newErrors.interest = 'Selecciona qué estás buscando.';
            isValid = false;
        }
    }

    if (currentStep === 1) {
        if (!formData.fullName.trim() || formData.fullName.length < 3) {
            newErrors.fullName = 'Introduce tu nombre completo.';
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Introduce un correo válido.';
            isValid = false;
        }
    }

    if (currentStep === 2) {
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (!formData.phone.trim() || phoneDigits.length < 7) {
            newErrors.phone = 'Introduce un teléfono válido.';
            isValid = false;
        }
        if (!formData.privacyAccepted) {
            newErrors.privacyAccepted = 'Acepta la política de privacidad.';
            isValid = false;
        }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleInterestSelect = (value: string) => {
    setFormData(prev => ({ ...prev, interest: value }));
    if (errors.interest) setErrors(prev => ({ ...prev, interest: undefined }));
  };

  const handleSuccess = () => {
    setStatus('success');
    setSubmittedData(formData);
    setTimeout(() => {
      setShowModal(true);
      setStatus('idle');
      setFormData({ fullName: '', email: '', phone: '', website: '', interest: '', privacyAccepted: false });
      setStep(0);
      if (onSuccess) onSuccess();
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      return;
    }

    setStatus('loading');

    // Mapeo de datos para el script de Google Sheets
    // El script espera: nombre, email, empresa, facturacion, sector, telefono
    const payload = {
      nombre: formData.fullName,
      email: formData.email,
      telefono: formData.phone,
      empresa: formData.website || "No indicada", // Mapeamos Website a Empresa
      sector: formData.interest || "No indicado", // Mapeamos Interés a Sector
      facturacion: "No indicada", // Campo requerido por el script, enviamos default
      
      // Campos extra para redundancia o si el script es flexible
      web: formData.website || "No especificada",
      interes: formData.interest,
      mensaje: "N/A (Formulario Web)",
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      origen: "Web Lead Form"
    };

    try {
      if (GOOGLE_SHEETS_WEBHOOK_URL && GOOGLE_SHEETS_WEBHOOK_URL.startsWith('http')) {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        
        console.log("Enviando JSON a Google Sheets (no-cors)... Payload completo.");
        handleSuccess();
        return;
      }

      // Fallback
      const response = await fetch("https://formsubmit.co/ajax/rechesphere@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nueva Solicitud Web: ${formData.fullName}`,
          _template: "table",
          _captcha: "false",
          ...payload
        })
      });

      if (response.ok) {
        handleSuccess();
      } else {
        console.error("Error en el envío");
        setStatus('error');
      }
    } catch (error) {
      console.error("Error de red", error);
      setStatus('error');
    }
  };

  const renderError = (field: keyof FormErrors) => {
    if (errors[field]) {
      return (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
        >
          <AlertCircle size={12} />
          {errors[field]}
        </motion.p>
      );
    }
    return null;
  };

  return (
    <>
      <div className={`flex flex-col h-full ${className}`}>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-3 md:mb-6 px-1">
            {steps.map((s, i) => (
                <div key={s.id} className="flex flex-col items-center relative z-10">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i <= step ? 'bg-primary scale-125' : 'bg-gray-200'
                    }`} />
                </div>
            ))}
        </div>

        {/* Compacted min-height for mobile */}
        <form onSubmit={handleSubmit} className="relative overflow-hidden min-h-[240px] md:min-h-[320px]" noValidate>
          <AnimatePresence initial={false} custom={direction} mode='popLayout'>
            
            {/* STEP 0: INTEREST & WEB */}
            {step === 0 && (
                <motion.div
                    key="step0"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full h-full space-y-2 md:space-y-5"
                >
                    <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                            ¿Qué objetivo persigues?
                        </label>
                        <div className="grid grid-cols-1 gap-1.5 md:gap-2">
                            {['Captar Clientes (Meta Ads)', 'Automatizar Ventas (Embudos)', 'Mejorar Imagen (Redes)', 'Auditoría General'].map((opt) => (
                                <div 
                                    key={opt}
                                    onClick={() => handleInterestSelect(opt)}
                                    className={`p-2 md:p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${
                                        formData.interest === opt 
                                        ? 'border-primary bg-blue-50 text-primary font-medium shadow-sm' 
                                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50 text-gray-600'
                                    }`}
                                >
                                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                        formData.interest === opt ? 'border-primary' : 'border-gray-300'
                                    }`}>
                                        {formData.interest === opt && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary" />}
                                    </div>
                                    <span className="text-xs md:text-sm">{opt}</span>
                                </div>
                            ))}
                        </div>
                        {renderError('interest')}
                    </div>

                    <div>
                        <label htmlFor="website" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                            Sitio Web (Opcional)
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-2.5 md:top-3.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                name="website"
                                placeholder="www.tunyegocio.com"
                                value={formData.website}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-4 py-2 md:py-3 text-sm rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* STEP 1: PERSONAL INFO */}
            {step === 1 && (
                <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full h-full space-y-2 md:space-y-5"
                >
                    <div className="text-center mb-1 md:mb-4">
                        <h4 className="text-sm md:text-lg font-semibold text-secondary">Cuéntanos sobre ti</h4>
                        <p className="text-xs md:text-sm text-gray-500">Para poder dirigirnos a ti correctamente.</p>
                    </div>

                    <div>
                        <label className="sr-only">Nombre completo</label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="text"
                            name="fullName"
                            placeholder="Nombre completo"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 md:py-3 text-sm rounded-lg border outline-none bg-gray-50 focus:bg-white transition-colors ${
                                errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary'
                            }`}
                        />
                        {renderError('fullName')}
                    </div>

                    <div>
                        <label className="sr-only">Correo electrónico</label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="email"
                            name="email"
                            placeholder="Correo profesional"
                            value={formData.email}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 md:py-3 text-sm rounded-lg border outline-none bg-gray-50 focus:bg-white transition-colors ${
                                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary'
                            }`}
                        />
                        {renderError('email')}
                    </div>
                </motion.div>
            )}

            {/* STEP 2: CONTACT & SUBMIT */}
            {step === 2 && (
                <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full h-full space-y-2 md:space-y-5"
                >
                    <div className="text-center mb-1 md:mb-4">
                         <h4 className="text-sm md:text-lg font-semibold text-secondary">Último paso</h4>
                         <p className="text-xs md:text-sm text-gray-500">Déjanos un teléfono para contactarte.</p>
                    </div>

                    <div>
                        <label className="sr-only">Teléfono</label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="tel"
                            name="phone"
                            placeholder="Teléfono móvil (+34...)"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`block w-full px-4 py-2 md:py-3 text-sm rounded-lg border outline-none bg-gray-50 focus:bg-white transition-colors ${
                                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary'
                            }`}
                        />
                        {renderError('phone')}
                    </div>

                    <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                        <div className="flex items-start space-x-3">
                            <div className="flex h-5 items-center">
                            <input
                                id="privacy_checkbox"
                                name="privacyAccepted"
                                type="checkbox"
                                checked={formData.privacyAccepted}
                                onChange={handleChange}
                                className={`h-4 w-4 md:h-5 md:w-5 rounded border text-primary focus:ring-primary cursor-pointer ${
                                    errors.privacyAccepted ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            </div>
                            <div className="text-xs text-gray-500 leading-snug">
                            <label htmlFor="privacy_checkbox" className="cursor-pointer">
                                He leído y acepto la política de privacidad. Entiendo que RecheSphere usará mis datos para contactarme sobre esta solicitud.
                            </label>
                            </div>
                        </div>
                        {renderError('privacyAccepted')}
                    </div>
                </motion.div>
            )}

          </AnimatePresence>
        </form>
        
        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-3 md:mt-6 pt-2 border-t border-gray-100">
            {step > 0 && (
                <button
                    type="button"
                    onClick={handleBack}
                    className="px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors font-medium flex items-center text-sm"
                    disabled={status === 'loading'}
                >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                    Atrás
                </button>
            )}
            
            {step < steps.length - 1 ? (
                <Button 
                    type="button" 
                    onClick={handleNext} 
                    className="flex-1 text-sm py-2 md:py-3"
                    variant="primary"
                >
                    Siguiente
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                </Button>
            ) : (
                <Button
                    type="button"
                    onClick={handleSubmit}
                    fullWidth={step === 0}
                    className={`flex-1 text-sm py-2 md:py-3 ${status === 'success' ? '!bg-green-600 !border-green-600' : ''} ${status === 'error' ? '!bg-red-500 !border-red-500' : ''}`}
                    isLoading={status === 'loading'}
                    loadingText="Enviando..."
                >
                     {status === 'success' ? (
                        <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                        ¡Enviado!
                        </span>
                    ) : status === 'error' ? (
                        "Error, reintentar"
                    ) : (
                        "Solicitar Estrategia"
                    )}
                </Button>
            )}
        </div>
        
        <p className="text-[10px] md:text-[11px] text-center text-gray-400 mt-2 md:mt-4">
          Paso {step + 1} de {steps.length}. Auditoría 100% gratuita.
        </p>

      </div>

      <SuccessModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        userData={submittedData ? {
          name: submittedData.fullName,
          email: submittedData.email,
          phone: submittedData.phone,
          interest: submittedData.interest
        } : undefined}
      />
    </>
  );
};

export default LeadForm;
