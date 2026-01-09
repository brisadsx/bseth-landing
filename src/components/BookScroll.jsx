import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// imgenes
import imgPortada from "../assets/portadabseth.webp";         // 1. tapa
import imgComoNacio from "../assets/interior_izqbseth.webp"; // 2. izq 1
import imgQueBuscamos from "../assets/interior_derbseth.webp"; // 3. der 1
import imgQuienesSomos from "../assets/interior_iz2bseth.webp"; // 4. izq 2
import imgCierre from "../assets/interior_der2bseth.webp";       // 5. der 2
import imgContraportada from "../assets/contraportada.webp";  // 6. contra


const Sheet = ({ scrollYProgress, range, frontImg, backImg, zIndexStart, zIndexEnd }) => {
  const rotate = useTransform(scrollYProgress, range, [0, -180]);
  
  const z = useTransform(scrollYProgress, range, [zIndexStart, zIndexEnd]);

  const progress = useTransform(scrollYProgress, range, [0, 1]);
  const shadowOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.2, 0]);

  return (
    <motion.div
      style={{ 
        rotateY: rotate, 
        zIndex: z,
        transformStyle: "preserve-3d", 
        transformOrigin: "left center" 
      }}
      className="absolute top-0 right-0 w-[50%] h-full bg-bseth-cream" 
    >
      {/* --- frente --- */}
      <div className="absolute inset-0 w-full h-full bg-bseth-cream" style={{ backfaceVisibility: 'hidden' }}>
        {/* Sombra interna del lomo */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none"/>
        <motion.div style={{ opacity: shadowOpacity }} className="absolute inset-0 bg-black pointer-events-none z-20" />
        <img src={frontImg} alt="frente" className="w-full h-full object-contain" />
      </div>

      {/* --- dorso --- */}
      <div 
        className="absolute inset-0 w-full h-full bg-bseth-cream"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        {/* sombra */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent z-10 pointer-events-none"/>
        <motion.div style={{ opacity: shadowOpacity }} className="absolute inset-0 bg-black pointer-events-none z-20" />
        <img src={backImg} alt="dorso" className="w-full h-full object-contain" />
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

  const xPosition = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["-25%", "0%", "0%", "25%"]);

  const bookShadowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[900vh] bg-bseth-cream">
      
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[2000px]">
        
        <motion.div 
            style={{ x: xPosition }}
            className="relative w-[90vw] md:w-[900px] h-[60vh] md:h-[85vh] flex justify-center items-center"
        >
          <motion.div 
            style={{ opacity: bookShadowOpacity }}
            className="absolute top-2 w-[98%] h-[98%] shadow-[0_30px_60px_rgba(0,0,0,0.4)] bg-white/5 rounded-sm"
          />

          <Sheet 
            scrollYProgress={scrollYProgress} 
            range={[0.65, 0.90]} 
            zIndexStart={10} 
            zIndexEnd={30}    
            frontImg={imgCierre}
            backImg={imgContraportada}
          />

          <Sheet 
            scrollYProgress={scrollYProgress} 
            range={[0.35, 0.60]}  // Gira en el medio
            zIndexStart={20} 
            zIndexEnd={20} 
            frontImg={imgQueBuscamos}
            backImg={imgQuienesSomos}
          />
          
          <Sheet 
            scrollYProgress={scrollYProgress} 
            range={[0.05, 0.30]}  // Gira primero
            zIndexStart={30} 
            zIndexEnd={10} 
            frontImg={imgPortada}
            backImg={imgComoNacio}
          />

        </motion.div>
      </div>
    </section>
  );
}