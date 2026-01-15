
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Paperclip, Smile, Check, Calendar, Mail, AlertTriangle } from 'lucide-react';
import { GoogleGenAI, Chat, Type, FunctionDeclaration } from "@google/genai";
import { GOOGLE_SHEETS_WEBHOOK_URL } from '../../constants';

// --- CONFIGURACIÓN DEL BOT Y HERRAMIENTAS ---

const SYSTEM_INSTRUCTION = `
Eres "Lisa", del equipo de "RecheSphere".
Tu objetivo principal es conseguir el LEAD (Nombre y Email) y llevarlos a agendar cita, pero actuando como una persona real en WhatsApp, no un robot.

**TU PERSONALIDAD:**
1. **Conversacional y Astuta:** No sueltes el botón de agendar a la primera. Es tu "premio". Antes de darlo, tienes que conseguir sus datos de forma natural.
2. **Cero Pesada:** No hagas interrogatorios policiales ("Deme su nombre. Deme su email").
   - MAL: "Para agendar necesito su nombre y correo electrónico."
   - BIEN: "Claro! Te paso el hueco ahora mismo. ¿Por quién pregunto?" -> (Usuario responde) -> "Genial Juan. ¿Y a qué correo te mando la confirmación?" -> (Usuario responde) -> [ENTREGAS EL BOTÓN].
3. **Estilo WhatsApp:** Usa emojis, sé breve, simpática y directa. No uses signos de apertura (¿ ¡).

**REGLAS DE ORO (TOOL: schedule_meeting):**
1. Esta herramienta requiere **Nombre** y **Email**.
2. Si el usuario pide cita ("quiero agendar"), **NO** llames a la herramienta todavía si no tienes sus datos.
3. Conversa para sacarles el nombre y el email primero. Hazlo en dos pasos si es necesario para que sea suave.
4. SOLO cuando tengas nombre y email, llamas a \`schedule_meeting\`.
5. Tras mostrar el botón, despídete majamente: "Ahí lo tienes, cualquier duda me dices!".

**HERRAMIENTAS (TOOLS):**
1. **send_contact_form**: Para dudas generales. Pide nombre y email suavemente.
2. **schedule_meeting**: Para agendar llamada. REQUIERE recolectar nombre y email antes.
`;

// Definición de herramientas para Gemini
const toolsDefinition: FunctionDeclaration[] = [
  {
    name: "send_contact_form",
    description: "Envía los datos del usuario y su consulta al equipo de RecheSphere vía email.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Nombre del usuario" },
        email: { type: Type.STRING, description: "Email del usuario" },
        message: { type: Type.STRING, description: "Mensaje, duda o resumen de la conversación" }
      },
      required: ["name", "email", "message"]
    }
  },
  {
    name: "schedule_meeting",
    description: "Genera un botón interactivo para agendar reunión. USAR SOLO TRAS OBTENER NOMBRE Y EMAIL.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Nombre del usuario (OBLIGATORIO)" },
        email: { type: Type.STRING, description: "Email del usuario (OBLIGATORIO)" },
        preferred_time: { type: Type.STRING, description: "Día y hora que el usuario prefiere (ej: Lunes por la tarde)" }
      },
      required: ["name", "email"] // Forzamos a la IA a preguntar esto antes de llamar a la función
    }
  }
];

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  type?: 'text' | 'system_action' | 'error'; // Para mostrar tarjetas especiales
  actionData?: any;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hola! 👋 Soy Lisa. Te gustaría saber cómo conseguir clientes predecibles cada mes?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializar Gemini con Tools
  useEffect(() => {
    const initChat = async () => {
      try {
        // Robust safety check for API Key access in browser environment
        let apiKey = '';
        try {
          // @ts-ignore - process might be polyfilled by Vite or missing
          if (typeof process !== 'undefined' && process.env) {
             // @ts-ignore
             apiKey = process.env.API_KEY;
          }
        } catch (e) {
          console.warn("No se pudo acceder a process.env de forma estándar");
        }

        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey: apiKey });
          const chat = ai.chats.create({
            model: 'gemini-2.5-flash', // Revertido a 2.5 Flash para estabilidad
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              tools: [{ functionDeclarations: toolsDefinition }],
              // ThinkingConfig eliminado para evitar conflicto con Tools/Model
            },
          });
          setChatSession(chat);
          setConnectionError(null);
        } else {
          console.warn("API_KEY no encontrada. Asegúrate de que está en las variables de entorno de Vercel.");
          setConnectionError("Falta API Key");
        }
      } catch (error) {
        console.error("Error crítico al inicializar el chat:", error);
        setConnectionError("Error de conexión");
      }
    };

    initChat();
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // --- LÓGICA DE HERRAMIENTAS ---

  const executeSendEmail = async (args: any) => {
    const payload = {
      nombre: args.name,
      email: args.email,
      mensaje_chat: args.message,
      telefono: "No compartido", // Default para que la columna no quede vacía
      web: "No compartida",      // Default para que la columna no quede vacía
      interes: "Lead desde Chat", // Default para que la columna no quede vacía
      empresa: "No indicada",
      facturacion: "No indicada",
      sector: "No indicado",
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      origen: "ChatBot WhatsApp"
    };

    try {
      // OPCIÓN 1: Google Sheets (Si está configurado) - JSON FORMAT
      if (GOOGLE_SHEETS_WEBHOOK_URL && GOOGLE_SHEETS_WEBHOOK_URL.startsWith('http')) {
          await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
             method: "POST",
             mode: "no-cors",
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(payload)
          });
          console.log("Datos enviados a Google Sheets desde Chatbot (JSON/no-cors)");
          return { status: "success", msg: "Datos guardados correctamente en Google Sheets." };
      }

      // OPCIÓN 2: FormSubmit.co (Fallback)
      await fetch("https://formsubmit.co/ajax/rechesphere@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nuevo Lead desde ChatBot: ${args.name}`,
          _template: "table",
          ...payload
        })
      });
      return { status: "success", msg: "Correo enviado correctamente al equipo." };
    } catch (error) {
      return { status: "error", msg: "Hubo un error técnico al enviar el correo." };
    }
  };

  const executeSchedule = async (args: any) => {
    // 1. Enviar datos a Google Sheets PRIMERO (Captura de Lead)
    // Esto asegura que aunque el usuario no termine de agendar en Cal.com, tenemos el lead.
    const payload = {
        nombre: args.name || "No especificado",
        email: args.email || "No especificado",
        telefono: "No compartido",
        web: "No compartida",
        interes: "Intención de Agendar Cita",
        empresa: "No indicada",
        facturacion: "No indicada",
        sector: "No indicado",
        mensaje_chat: `Preferencia horaria: ${args.preferred_time || 'No indicada'}`,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        origen: "ChatBot Schedule Tool"
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
            console.log("Datos de cita enviados a Google Sheets (Shadow Lead)");
        }
    } catch (e) {
        console.error("Error salvando lead de cita:", e);
    }

    // 2. Construir URL de Cal.com
    let url = 'https://cal.com/rechesphere/15min';
    const params = new URLSearchParams();
    
    if (args.name) params.append('name', args.name);
    if (args.email) params.append('email', args.email);
    
    let notes = "Reserva desde ChatBot.";
    if (args.preferred_time) notes += ` Preferencia del usuario: ${args.preferred_time}`;
    
    params.append('notes', notes);
    
    const finalUrl = `${url}?${params.toString()}`;
    
    return { 
      status: "success", 
      url: finalUrl, 
      // Nota interna para el sistema, no se muestra al usuario directamente
      internalMsg: "Button displayed." 
    };
  };

  // --- MANEJO DEL CHAT ---

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Check for initialization errors or missing session
    if (connectionError) {
       setMessages(prev => [...prev, {
         id: Date.now().toString(),
         role: 'model',
         text: "⚠️ Error de sistema: No se detectó la API Key. Por favor, configúrala en Vercel > Settings > Environment Variables.",
         type: 'error',
         timestamp: new Date()
       }]);
       setInputValue('');
       return;
    }

    if (!chatSession) {
       // Attempt re-init
       setConnectionError("Conectando...");
       // Allow user to try again next click
       return;
    }

    const userText = inputValue;
    setInputValue('');

    // 1. Mostrar mensaje usuario
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    }]);

    // ACTIVAMOS "ESCRIBIENDO"
    setIsTyping(true);

    try {
      // 2. Enviar a Gemini
      let result = await chatSession.sendMessage({ message: userText });
      
      // Safe access to text to avoid warning if it's a function call
      // @ts-ignore
      const parts = result.candidates?.[0]?.content?.parts || [];
      const hasText = parts.some((p: any) => p.text);
      let responseText = hasText ? result.text : "";
      
      // 3. Revisar Function Calls
      // @ts-ignore
      const toolCalls = result.functionCalls || parts.filter((p: any) => p.functionCall).map((p: any) => p.functionCall);

      if (toolCalls && toolCalls.length > 0) {
        setIsTyping(false); 
        
        const responseParts = [];

        for (const toolCall of toolCalls) {
          const functionName = toolCall.name;
          const args = toolCall.args;
          let functionResponseResult;

          // A. EJECUTAR ACCIÓN LOCAL
          if (functionName === 'send_contact_form') {
             setMessages(prev => [...prev, {
               id: Date.now().toString() + '_action',
               role: 'model',
               text: "📧 Guardando tus datos...",
               type: 'system_action',
               timestamp: new Date()
             }]);
             
             const res = await executeSendEmail(args);
             functionResponseResult = { result: res.msg };

             setMessages(prev => [...prev, {
                id: Date.now().toString() + '_confirm',
                role: 'model',
                text: "✅ Listo! Hemos recibido tus datos. Te escribimos pronto.",
                timestamp: new Date()
              }]);

          } else if (functionName === 'schedule_meeting') {
             // AHORA ESPERAMOS A QUE SE ENVIEN LOS DATOS AL SHEET
             const res = await executeSchedule(args);
             
             // Le decimos a la IA que el botón ya se mostró y le damos instrucciones de qué decir ahora
             functionResponseResult = { result: "BOTON_MOSTRADO_CORRECTAMENTE. Instrucción: Ahora responde SOLO: 'Si necesitas algo más no dudes en preguntar.' o similar." };

             setMessages(prev => [...prev, {
               id: Date.now().toString() + '_schedule',
               role: 'model',
               text: "Genial! Pulsa abajo para reservar tu hora:",
               type: 'system_action',
               actionData: { type: 'schedule', url: res.url },
               timestamp: new Date()
             }]);
          }

          responseParts.push({
            functionResponse: {
              name: functionName,
              response: functionResponseResult,
              id: toolCall.id
            }
          });
        }

        // B. ENVIAR RESPUESTA TÉCNICA A GEMINI (FOLLOW-UP)
        if (responseParts.length > 0) {
             setIsTyping(true);
             try {
                 // FIX: Pass as object with message property to avoid "ContentUnion is required"
                 const nextResponse = await chatSession.sendMessage({ message: responseParts });
                 setIsTyping(false);

                 // Safe check again
                 const nextParts = nextResponse.candidates?.[0]?.content?.parts || [];
                 const nextHasText = nextParts.some((p: any) => p.text);

                 if (nextHasText && nextResponse.text && nextResponse.text.trim().length > 0) {
                    setMessages(prev => [...prev, {
                      id: Date.now().toString() + '_followup',
                      role: 'model',
                      text: nextResponse.text,
                      timestamp: new Date()
                    }]);
                 }
             } catch (innerError) {
                 console.error("Silent error in follow-up:", innerError);
                 setIsTyping(false);
                 // Swallow error here to avoid showing "Error" message after successful button render
             }
        }

      } else {
        // 4. Respuesta Normal de Texto
        if (responseText) {
            const delay = Math.max(1000, Math.min(4000, responseText.length * 20));
            await new Promise(resolve => setTimeout(resolve, delay));
            
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'model',
              text: responseText,
              timestamp: new Date()
            }]);
        } else {
            setIsTyping(false);
        }
      }

    } catch (error) {
      console.error("Error chat main:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Perdona, ha habido un error de conexión. ¿Puedes repetirlo?",
        type: 'error',
        timestamp: new Date()
      }]);
    } 
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Renderizador de mensajes especiales (Tarjetas de acción)
  const renderMessageContent = (msg: Message) => {
    if (msg.type === 'error') {
        return (
            <div className="flex items-start gap-2 text-red-600">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{msg.text}</span>
            </div>
        )
    }
    if (msg.type === 'system_action' && msg.actionData?.type === 'schedule') {
       return (
         <div className="flex flex-col gap-2">
            <span>{msg.text}</span>
            <a 
              href={msg.actionData.url} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1da851] text-white text-center py-2.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 mt-1 transition-colors shadow-sm border-b-2 border-[#128C7E] active:border-b-0 active:translate-y-[2px]"
            >
               <Calendar size={18} /> Agendar Cita Ahora
            </a>
         </div>
       );
    }
    if (msg.type === 'system_action') {
        return <span className="italic text-gray-600 flex items-center gap-2"><Mail size={14}/> {msg.text}</span>;
    }
    return <p className="whitespace-pre-wrap break-words">{msg.text}</p>;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-4 right-4 md:absolute md:bottom-20 md:right-0 md:left-auto md:w-[380px] h-[60vh] md:h-[550px] max-h-[80vh] bg-[#EFEAE2] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-[10000]"
          >
            {/* --- Header WhatsApp Style --- */}
            <div className="bg-[#008069] p-3 flex items-center gap-3 text-white shadow-sm shrink-0">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                   <span className="font-bold text-lg">R</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#008069]"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base leading-tight">Soporte RecheSphere</h3>
                <p className="text-xs text-green-100/80">
                    {isTyping ? 'Escribiendo...' : 'Responde en segundos'}
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* --- Chat Body --- */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300"
              style={{
                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                backgroundBlendMode: 'soft-light',
                backgroundColor: '#E5DDD5' // WhatsApp default background color
              }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-lg px-3 py-2 relative shadow-sm text-[14.5px] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#D9FDD3] text-gray-800 rounded-tr-none' 
                        : msg.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800 rounded-tl-none'
                        : 'bg-white text-gray-800 rounded-tl-none'
                    } ${msg.type === 'system_action' ? 'border-l-4 border-green-500 pl-4' : ''}`}
                  >
                    {renderMessageContent(msg)}
                    
                    <div className="flex justify-end items-center gap-1 mt-1 opacity-60">
                      <span className="text-[10px] min-w-[45px] text-right">
                        {formatTime(msg.timestamp)}
                      </span>
                      {msg.role === 'user' && (
                        <div className="flex -space-x-1">
                            <Check size={12} className="text-blue-500" />
                            <Check size={12} className="text-blue-500" />
                        </div>
                      )}
                    </div>
                    
                    {/* Triangle tail (solo para mensajes normales) */}
                    {!msg.type && (
                        <div className={`absolute top-0 w-0 h-0 border-[6px] border-transparent ${
                            msg.role === 'user' 
                            ? 'right-[-6px] border-t-[#D9FDD3] border-r-0' 
                            : 'left-[-6px] border-t-white border-l-0'
                        }`} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator - Always Visible during delay */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                   <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1 w-16 relative">
                      <div className="absolute top-0 left-[-6px] w-0 h-0 border-[6px] border-transparent border-t-white border-l-0"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                   </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* --- Input Area --- */}
            <div className="bg-[#F0F2F5] p-2 px-3 flex items-center gap-2 shrink-0">
              <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
                 <Smile size={24} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors hidden md:block">
                 <Paperclip size={22} />
              </button>
              
              <div className="flex-1 bg-white rounded-lg flex items-center border border-transparent focus-within:border-green-500/50 transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Escribe un mensaje"
                  className="w-full px-4 py-2.5 bg-transparent border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
                />
              </div>
              
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`p-3 rounded-full transition-all shadow-sm flex items-center justify-center ${
                    inputValue.trim() 
                    ? 'bg-[#008069] text-white hover:bg-[#006d59] scale-100' 
                    : 'bg-transparent text-gray-400 scale-90'
                }`}
              >
                <Send size={20} className={inputValue.trim() ? "ml-0.5" : ""} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Launcher Button --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.4)] transition-shadow relative z-[100]"
      >
        <AnimatePresence mode='wait'>
            {isOpen ? (
                <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                >
                    <X className="text-white w-7 h-7" />
                </motion.div>
            ) : (
                <motion.div
                    key="chat"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="relative"
                >
                    <MessageCircle className="text-white w-8 h-8 fill-white/20" />
                    {/* Notification Dot */}
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-[#25D366]"></span>
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
