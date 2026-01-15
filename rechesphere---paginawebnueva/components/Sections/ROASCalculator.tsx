
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Users, DollarSign, ArrowRight, Bot, Sparkles, Briefcase, BarChart3, Loader2 } from 'lucide-react';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";

// Definimos la estructura exacta que queremos que nos devuelva la IA
interface PredictionData {
  estimatedLeads: number;
  estimatedRevenue: number;
  roas: number;
  explanation: string;
}

const ROASCalculator: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    sector: '',
    budget: 1000,
    ticket: 150
  });

  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sectores predefinidos para facilitar
  const sectors = [
    "E-commerce / Moda",
    "Servicios Profesionales (Abogados, Consultores)",
    "Inmobiliaria / Real Estate",
    "Formación / Cursos Online",
    "Clínicas / Salud",
    "Reformas / Hogar",
    "SaaS / Software",
    "Otro"
  ];

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sector) {
      setError("Por favor, selecciona o escribe un sector.");
      return;
    }
    
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key no configurada");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Configuración estricta para asegurar JSON válido
      const schema = {
        type: Type.OBJECT,
        properties: {
          estimatedLeads: { type: Type.NUMBER, description: "Número de leads mensuales estimados" },
          estimatedRevenue: { type: Type.NUMBER, description: "Facturación mensual estimada (Leads * 0.25 * Ticket)" },
          roas: { type: Type.NUMBER, description: "Retorno de inversión calculado" },
          explanation: { type: Type.STRING, description: "Breve explicación estratégica (max 30 palabras) justificando la tasa de cierre." },
        },
        required: ["estimatedLeads", "estimatedRevenue", "roas", "explanation"],
      };

      // INSTRUCCIONES: TASA DE CIERRE 25%
      const prompt = `
        Actúa como un experto en Meta Ads y Estrategia Digital.
        El usuario tiene un negocio en el sector: "${formData.sector}".
        Va a invertir: ${formData.budget}€ mensuales.
        Su ticket medio (precio producto/servicio) es: ${formData.ticket}€.

        Calcula una proyección OPTIMISTA pero REALISTA basada en un sistema de alta cualificación.
        
        REGLA MATEMÁTICA OBLIGATORIA:
        1. Estima los Leads basándote en un CPL (Coste por Lead) razonable para el sector.
        2. TASA DE CIERRE: Aplica EXTACTAMENTE un 25% de cierre de ventas sobre los leads.
           (Ejemplo: Si hay 40 leads, asume 10 ventas).
        3. FACTURACIÓN = (Leads * 0.25) * Ticket Medio.
        4. ROAS = Facturación / Inversión.

        Devuelve un JSON con:
        - estimatedLeads: Cantidad de potenciales clientes.
        - estimatedRevenue: Facturación calculada con la regla del 25%.
        - roas: El ROAS resultante.
        - explanation: Una frase MUY BREVE y persuasiva (máximo 25-30 palabras) explicando que gracias a la cualificación del sistema, cerramos 1 de cada 4 leads.
      `;

      // USANDO GEMINI 2.5 FLASH CON THINKING BUDGET (Soportado)
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          thinkingConfig: { thinkingBudget: 12000 } // Ajustado para Gemini 2.5 Flash (Max 24k)
        }
      });

      const text = response.text;
      if (text) {
        const data = JSON.parse(text) as PredictionData;
        setPrediction(data);
      } else {
        throw new Error("No se generó respuesta");
      }

    } catch (err) {
      console.error(err);
      // Fallback manual actualizado al 25% de cierre
      // Asumimos un CPL promedio de 12€ para el cálculo manual
      const fallbackLeads = Math.floor((formData.budget / 12)); 
      // Aplicamos la regla del 25% (0.25)
      const fallbackRev = Math.floor(fallbackLeads * 0.25 * formData.ticket); 
      
      setPrediction({
        estimatedLeads: fallbackLeads,
        estimatedRevenue: fallbackRev,
        roas: parseFloat((fallbackRev / formData.budget).toFixed(1)),
        explanation: "Con nuestro sistema de filtrado, estimamos convertir el 25% de tus leads en clientes de pago."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#0B0F17] relative overflow-hidden font-sans">
      {/* Background Tech Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,24,39,0.9)_2px,transparent_2px),linear-gradient(90deg,rgba(17,24,39,0.9)_2px,transparent_2px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6"
          >
             <Sparkles size={14} /> Powered by Gemini AI (Reasoning Mode)
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-display text-white mb-4"
          >
            Simulador de Rentabilidad
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dime tu sector y presupuesto. Nuestra IA analizará el mercado para estimar tu potencial de retorno real.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* --- LEFT COLUMN: INPUT FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            
            <form onSubmit={handleCalculate} className="space-y-6">
              
              {/* Sector Input */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <Briefcase size={16} className="text-primary" /> Sector de tu negocio
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none cursor-pointer"
                    value={formData.sector}
                    onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  >
                    <option value="" disabled>Selecciona un sector...</option>
                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Budget Input */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <BarChart3 size={16} className="text-accent" /> Inversión Mensual Ads (€)
                </label>
                <div className="relative group">
                  <input 
                    type="number" 
                    min="500"
                    step="100"
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-accent focus:border-transparent outline-none font-mono tracking-wider transition-all group-hover:border-gray-600"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono">€</div>
                </div>
                <input 
                  type="range" 
                  min="500" max="10000" step="100" 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
                  className="w-full mt-3 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              {/* Ticket Input */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <DollarSign size={16} className="text-green-400" /> Ticket Medio (€)
                </label>
                <div className="relative group">
                  <input 
                    type="number" 
                    min="10"
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-mono tracking-wider transition-all group-hover:border-gray-600"
                    value={formData.ticket}
                    onChange={(e) => setFormData({...formData, ticket: parseInt(e.target.value) || 0})}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono">€</div>
                </div>
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <Button 
                type="submit" 
                fullWidth 
                isLoading={loading}
                loadingText="Analizando mercado..."
                className="!bg-primary hover:!bg-blue-600 !text-white !rounded-xl !py-4 shadow-lg shadow-primary/20"
              >
                {loading ? "Analizando..." : "Calcular Potencial con IA"}
              </Button>

            </form>
          </motion.div>

          {/* --- RIGHT COLUMN: AI RESULTS --- */}
          <motion.div 
            className="lg:col-span-7 h-full min-h-[400px] flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode='wait'>
              
              {/* STATE: LOADING */}
              {loading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 bg-gray-900/30 border border-white/5 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <Bot className="absolute inset-0 m-auto text-primary w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Neural Core Pensando...</h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto">
                    Analizando costes por clic y tasas de conversión promedio para el sector <span className="text-primary">{formData.sector}</span>...
                  </p>
                </motion.div>
              )}

              {/* STATE: RESULT */}
              {!loading && prediction && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-gray-900 via-[#111827] to-black border border-primary/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl flex-1 flex flex-col justify-between"
                >
                  {/* Decorative Scanline */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_rgba(11,114,255,0.8)] animate-pulse" />
                  
                  <div className="space-y-8">
                    {/* Header Result */}
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
                          <Bot className="w-5 h-5 text-green-400" />
                       </div>
                       <div>
                         <h4 className="text-white font-bold">Análisis Completado</h4>
                         <p className="text-xs text-gray-400">Proyección mensual estimada</p>
                       </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Leads Est.</p>
                        <p className="text-3xl lg:text-4xl font-mono text-white font-bold">
                          ~{prediction.estimatedLeads}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                         <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">ROAS Est.</p>
                         <p className="text-3xl lg:text-4xl font-mono text-accent font-bold">
                           x{prediction.roas}
                         </p>
                      </div>
                    </div>

                    {/* Revenue Hero */}
                    <div className="text-center py-6 bg-primary/10 rounded-2xl border border-primary/20">
                      <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Facturación Potencial</p>
                      <p className="text-5xl lg:text-6xl font-bold text-white font-display tracking-tight">
                        {prediction.estimatedRevenue.toLocaleString()}€
                      </p>
                    </div>

                    {/* AI Explanation Text */}
                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                       <p className="text-gray-300 text-sm italic leading-relaxed">
                         <span className="text-accent font-bold not-italic mr-2">Opinión de la IA:</span>
                         "{prediction.explanation}"
                       </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button 
                      onClick={() => navigate('/contacto')}
                      fullWidth 
                      className="!bg-white !text-black hover:!bg-gray-200 !font-bold"
                    >
                      Materializar estos resultados <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STATE: IDLE (Placeholder) */}
              {!loading && !prediction && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 bg-gray-900/20 border border-white/5 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <Calculator className="w-16 h-16 text-gray-700 mb-4" />
                  <h3 className="text-xl font-bold text-gray-500 mb-2">Esperando datos...</h3>
                  <p className="text-gray-600 text-sm max-w-xs mx-auto">
                    Completa el formulario de la izquierda para generar una simulación personalizada.
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ROASCalculator;
