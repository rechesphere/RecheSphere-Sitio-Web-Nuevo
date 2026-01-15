
import React, { useEffect, useRef } from 'react';

const DarkVeil: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Optimización: alpha false si el fondo es opaco (aquí es dudoso porque se usa transparente encima, pero ayuda)
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let time = 0;
    let animId: number;

    // Detectar móvil para reducir carga
    const isMobile = window.innerWidth < 768;

    // Mouse state
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    // Resize handler
    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // Mouse move handler - Throttled slightly by browser but good to be careful
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return; // No calcular mouse en móvil
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    
    // Solo escuchar mouse en desktop
    if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
    }

    // Configuration - OPTIMIZADA PARA MOVIL
    const config = {
      lineCount: isMobile ? 15 : 40, // Reducir lineas en móvil drásticamente
      speed: 0.002,
      amplitude: 50,
      mouseInfluence: isMobile ? 0 : 60, // Sin influencia en móvil
      color: 'rgba(255, 255, 255, 0.03)'
    };

    const animate = () => {
      // Si no está en viewport (simple check), podríamos pausar, pero Framer Motion maneja el montaje/desmontaje
      
      // Limpiar con fillRect es a veces más rápido que clearRect
      ctx.fillStyle = '#0F1115';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse movement (solo desktop)
      if (!isMobile) {
          mouse.x += (mouse.targetX - mouse.x) * 0.05;
          mouse.y += (mouse.targetY - mouse.y) * 0.05;
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = config.color;

      time += config.speed;

      for (let i = 0; i < config.lineCount; i++) {
        ctx.beginPath();
        
        const xOffset = (width / config.lineCount) * i;
        ctx.moveTo(xOffset, 0);

        // Optimización: Reducir resolución de puntos en el eje Y
        const stepY = isMobile ? 20 : 10;

        for (let y = 0; y <= height; y += stepY) {
          const wave = Math.sin(y * 0.01 + time + i * 0.1) * config.amplitude;
          
          let interaction = 0;
          if (!isMobile) {
            const dx = xOffset - mouse.x;
            const dy = y - mouse.y;
            // Evitar Math.sqrt para rendimiento extremo si es posible, pero aquí es necesario para la distancia radial
            const distSq = dx * dx + dy * dy; 
            
            if (distSq < 90000) { // 300 * 300
                const dist = Math.sqrt(distSq);
                const force = (300 - dist) / 300;
                interaction = Math.sin(force * Math.PI) * config.mouseInfluence * (dx < 0 ? -1 : 1);
            }
          }

          ctx.lineTo(xOffset + wave + interaction, y);
        }

        ctx.stroke();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#0F1115]">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Overlay vignette using CSS gradients (GPU accelerated) instead of canvas operations */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115] via-transparent to-[#0F1115] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-transparent to-[#0F1115] pointer-events-none"></div>
    </div>
  );
};

export default DarkVeil;
