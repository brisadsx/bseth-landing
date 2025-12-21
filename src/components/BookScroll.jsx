import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- PÁGINA INDIVIDUAL QUE GIRA ---
const Page = ({ scrollYProgress, range, frontContent, backContent, zIndex }) => {
  const rotate = useTransform(scrollYProgress, range, [0, -180]);
  const z = useTransform(scrollYProgress, range, [zIndex, 0]);
  
  // Sombras dinámicas para el efecto de curvatura al girar
  const progress = useTransform(scrollYProgress, range, [0, 1]);
  // Sombra más sutil para papel de revista
  const curlShadow = useTransform(progress, [0, 0.5, 1], [0, 0.3, 0]);
  const spineLight = useTransform(progress, [0, 0.2], [0, 0.4]);

  return (
    <motion.div
      style={{ 
        rotateY: rotate, 
        zIndex: z,
        transformStyle: "preserve-3d", 
        transformOrigin: "left center" 
      }}
      // Quitamos bordes gruesos, usamos un shadow sutil
      className="absolute top-0 right-0 w-[50%] h-full bg-[#F8F8F6] shadow-md overflow-hidden"
    >
      {/* --- CARA FRONTAL (Derecha) --- */}
      <div 
        className="absolute inset-0 flex flex-col" 
        style={{ backfaceVisibility: 'hidden' }}
      >
        {/* Sombra interna del lomo (siempre presente) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
        
        {/* Sombras dinámicas al girar */}
        <motion.div style={{ opacity: curlShadow }} className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-20" />
        <motion.div style={{ opacity: spineLight }} className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/50 to-transparent pointer-events-none z-20" />
        
        <div className="relative z-0 h-full p-8 md:p-12">{frontContent}</div>
      </div>

      {/* --- CARA TRASERA (Izquierda - Al voltear) --- */}
      <div 
        className="absolute inset-0 bg-[#F8F8F6] flex flex-col"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
         {/* Sombra interna del lomo (lado derecho ahora) */}
         <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
         {/* Sombra general al pasar */}
         <motion.div style={{ opacity: curlShadow }} className="absolute inset-0 bg-black/10 pointer-events-none z-20" />
         
         <div className="relative z-0 h-full p-8 md:p-12">{backContent}</div>
      </div>
    </motion.div>
  );
};

export default function BookScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Color de papel off-white tipo revista
  const paperColor = "bg-[#F8F8F6]";

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-bseth-brown">
      
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[2000px]">
        
        {/* --- ESTRUCTURA DE LA REVISTA (BASE) --- */}
        {/* Dimensiones más altas y estrechas, sombra suave debajo */}
        <div className={`relative w-[95vw] md:w-[960px] h-[60vh] md:h-[85vh] flex shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${paperColor}`}>
          
          {/* 1. PÁGINA IZQUIERDA BASE (Estática) */}
          <div className="w-1/2 h-full relative overflow-hidden">
             {/* Sombra crucial para el efecto de encuadernación central */}
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/15 to-transparent pointer-events-none z-10"></div>
             {/* CONTENIDO BASE IZQUIERDA (Vacío para ti) */}
             <div className="h-full p-10 md:p-14 relative z-0">
                {/* Agrega tu contenido aquí */}
             </div>
          </div>
          
          {/* 2. PÁGINA DERECHA BASE (Estática - La última hoja) */}
          <div className="w-1/2 h-full relative overflow-hidden">
             {/* Sombra crucial para el efecto de encuadernación central */}
             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/15 to-transparent pointer-events-none z-10"></div>
             
             {/* CONTENIDO BASE DERECHA (Vacío para ti) */}
             <div className="h-full p-10 md:p-14 relative z-0 flex flex-col justify-end items-end">
                {/* Agrega tu contenido aquí */}
                <span className="font-sans text-[10px] text-gray-400 tracking-widest uppercase">Fin Volumen I</span>
             </div>
          </div>

          {/* --- PÁGINAS DINÁMICAS (Que giran) --- */}

          {/* PÁGINA 2 */}
          <Page scrollYProgress={scrollYProgress} range={[0.4, 0.7]} zIndex={30}
            frontContent={
                // CONTENIDO FRENTE PÁGINA 2 (Vacío)
                <div className="h-full relative border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    Contenido Frente Pág 2
                </div>
            }
            backContent={
                // CONTENIDO DORSO PÁGINA 2 (Vacío)
                <div className="h-full relative border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    Contenido Dorso Pág 2
                </div>
            }
          />

          {/* PÁGINA 1 (Portada) */}
          <Page scrollYProgress={scrollYProgress} range={[0, 0.3]} zIndex={40}
            frontContent={
                // CONTENIDO PORTADA (Vacío)
                <div className="h-full relative border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    Portada / Título
                </div>
            }
            backContent={
                 // CONTENIDO CONTRATAPA (Vacío)
                <div className="h-full relative border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    Contenido Contratapa
                </div>
            }
          />

        </div>
      </div>
    </section>
  );
}