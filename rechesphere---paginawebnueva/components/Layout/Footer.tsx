import React from 'react';
import { APP_NAME } from '../../constants';
import { Facebook, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  // Custom TikTok Icon component since it's not always available in standard Lucide sets
  const TikTokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl" aria-hidden="true">
                R
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                {APP_NAME}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Ayudamos a negocios a captar clientes reales con campañas estratégicas y embudos optimizados.
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/rechesphere/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#E1306C] transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram size={20} />
              </a>
              
              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@rechesphere?_t=ZN-8wIixMRGQIY&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors" // TikTok brand color is black/white, usually white on dark bg
                aria-label="Síguenos en TikTok"
              >
                <TikTokIcon size={20} />
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61573847093072&mibextid=wwXIfr&rdid=gcOA8iGKyaqpyxPZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18wZXZooot%2F%3Fmibextid%3DwwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1877F2] transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Servicios</h4>
            <nav>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => navigate('/meta-ads')} className="hover:text-white transition-colors text-left">Meta Ads</button></li>
                <li><button onClick={() => navigate('/embudos')} className="hover:text-white transition-colors text-left">Embudos de Venta</button></li>
                <li><button onClick={() => navigate('/gestion-estrategica')} className="hover:text-white transition-colors text-left">Gestión Redes</button></li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Empresa</h4>
            <nav>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><button onClick={() => navigate('/sobre')} className="hover:text-white transition-colors text-left">Sobre nosotros</button></li>
                <li><button onClick={() => navigate('/contacto')} className="hover:text-white transition-colors text-left">Contacto</button></li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Tips de growth semanales.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="tu@email.com" 
                className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg text-sm w-full focus:outline-none focus:border-primary"
              />
              <button type="submit" aria-label="Suscribirse" className="bg-primary hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
             <button className="hover:text-white">Privacidad</button>
             <button className="hover:text-white">Cookies</button>
             <button onClick={() => navigate('/contacto')} className="hover:text-white">Contacto</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;