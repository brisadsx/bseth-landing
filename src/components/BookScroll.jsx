import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// componente para cada página que gira
const Page = ({ scrollYProgress, range, frontContent, backContent, zIndex }) => {
  const rotate = useTransform(scrollYProgress, range, [0, -180]);
  const z = useTransform(scrollYProgress, range, [zIndex, 0]);
  
  // sombras dinámicas
  const progress = useTransform(scrollYProgress, range, [0, 1]);
  // sombra más sutil 
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
      className="absolute top-0 right-0 w-[50%] h-full bg-[#F8F8F6] shadow-md overflow-hidden"
    >
      {/* --- cara frontal (derecha) --- */}
      <div 
        className="absolute inset-0 flex flex-col" 
        style={{ backfaceVisibility: 'hidden' }}
      >
        {/* sombra interna(siempre presente) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
        
        {/* sombras dinámicas al girar */}
        <motion.div style={{ opacity: curlShadow }} className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-20" />
        <motion.div style={{ opacity: spineLight }} className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/50 to-transparent pointer-events-none z-20" />
        
        <div className="relative z-0 h-full p-8 md:p-12">{frontContent}</div>
      </div>

      {/* cara trasera */}
      <div 
        className="absolute inset-0 bg-[#F8F8F6] flex flex-col"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
         {/* sombra interna (lado derecho ahora) */}
         <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
         {/* sombra general al pasar */}
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

  const paperColor = "bg-[#F8F8F6]";

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-bseth-brown">
      
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[2000px]">
        
        {/* --- estructura de la revista (base) --- */}
        <div className={`relative w-[95vw] md:w-[960px] h-[60vh] md:h-[85vh] flex shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${paperColor}`}>
          
          {/* 1. página izquierda  */}
          <div className="w-1/2 h-full relative overflow-hidden">
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/15 to-transparent pointer-events-none z-10"></div>
             {/* contenido de la izquierda */}
             <div className="h-full p-10 md:p-14 relative z-0">
                {/* agregar aca */}
             </div>
          </div>
          
          {/* 2. página derecha */}
          <div className="w-1/2 h-full relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/15 to-transparent pointer-events-none z-10"></div>
             
             {/* contenido de la derecha */}
             <div className="h-full p-10 md:p-14 relative z-0 flex flex-col justify-end items-end">
                {/* agregar aca */}
                <span className="font-sans text-[10px] text-gray-400 tracking-widest uppercase">Fin Volumen I</span>
             </div>
          </div>

          {/* --- páginas que giran--- */}

          {/* pag2 */}
          <Page scrollYProgress={scrollYProgress} range={[0.4, 0.7]} zIndex={30}
            frontContent={
               
                <div className="h-full relative border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    cont frente 2
                </div>
            }
            backContent={
                
                <div className="h-full relative border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    cont dorso 2
                </div>
            }
          />

          {/* portada */}
          <Page scrollYProgress={scrollYProgress} range={[0, 0.3]} zIndex={40}
            frontContent={
                <div className="h-full relative border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    titulo portada
                </div>
            }
            backContent={
                <div className="h-full relative border-dashed border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    contraportada
                </div>
            }
          />

        </div>
      </div>
    </section>
  );
}