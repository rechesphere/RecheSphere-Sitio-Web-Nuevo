
import { BarChart3, Megaphone, Target, Search, Zap, Users } from 'lucide-react';
import { NavItem, Service, ProcessStep, Testimonial } from './types';

export const APP_NAME = "RecheSphere";

// Enlace de conexión con Google Sheets (Actualizado)
export const GOOGLE_SHEETS_WEBHOOK_URL: string = "https://script.google.com/macros/s/AKfycbxhr1JxAe95K3W7xFb9NK2NJRGow1KvgYUzb-MKXug_V8H1GO-MdfXWjmL4G-MJ1STE5A/exec"; 

export const NAV_ITEMS: NavItem[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sobre Nosotros', href: '/sobre' },
  { label: 'Contacto', href: '/contacto' },
];

export const SERVICES: Service[] = [
  {
    id: 'meta-ads',
    title: 'Meta Ads Avanzado',
    shortDesc: 'Campañas de Facebook e Instagram que escalan.',
    fullDesc: 'Diseñamos arquitecturas de campañas complejas enfocadas en ROAS. Segmentación láser y creatividades que detienen el scroll.',
    icon: Target
  },
  {
    id: 'embudos',
    title: 'Embudos de Venta',
    shortDesc: 'Sistemas automatizados que convierten visitas en leads.',
    fullDesc: 'Desde la landing page hasta la secuencia de email marketing. Construimos todo el ecosistema necesario para nutrir y cerrar clientes.',
    icon: Zap
  },
  {
    id: 'social-growth',
    title: 'Gestión Estratégica',
    shortDesc: 'Contenido orgánico que apoya la conversión paga.',
    fullDesc: 'No publicamos por publicar. Alineamos tu contenido orgánico con tus objetivos de facturación para crear autoridad de marca.',
    icon: Megaphone
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Análisis Profundo',
    description: 'Auditamos tu situación actual, tu oferta y tu competencia para encontrar las fugas de dinero.',
    icon: Search
  },
  {
    id: 2,
    title: 'Estrategia & Montaje',
    description: 'Implementamos el sistema de adquisición: creatividades, copy, landing pages y tracking.',
    icon: BarChart3
  },
  {
    id: 3,
    title: 'Optimización Continua',
    description: 'Medimos resultados diariamente y ajustamos para reducir costes y aumentar el volumen de clientes.',
    icon: Users
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendez',
    role: 'CEO',
    company: 'TechFlow',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    quote: 'Gracias a la estrategia de embudos de RecheSphere, hemos duplicado nuestros leads cualificados en solo 3 meses. La transparencia en el proceso es lo que más valoramos.',
    metric: '+110% Leads Cualificados'
  },
  {
    id: '2',
    name: 'Ana López',
    role: 'Directora de Marketing',
    company: 'ModaVibe',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    quote: 'Nuestras campañas de Meta Ads estaban estancadas. El equipo reestructuró todo y el ROAS pasó de 2.5 a 6.0 en tiempo récord. Son verdaderos expertos.',
    metric: 'ROAS x2.4'
  },
  {
    id: '3',
    name: 'Javier Torres',
    role: 'Fundador',
    company: 'EduMaster',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    quote: 'La gestión estratégica de nuestras redes ha transformado nuestra marca. Ahora tenemos una comunidad comprometida que realmente compra nuestros cursos.',
    metric: '+45% Conversión Orgánica'
  }
];
