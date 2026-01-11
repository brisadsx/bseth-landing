import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// imagenes
import imgPortada from "../assets/portadabseth.webp";         
import imgComoNacio from "../assets/interior_izqbseth.webp"; 
import imgQueBuscamos from "../assets/interior_derbseth.webp"; 
import imgQuienesSomos from "../assets/interior_iz2bseth.webp"; 
import imgCierre from "../assets/interior_der2bseth.webp";       
import imgContraportada from "../assets/contraportada.webp";  

// --- sheet ---
const Sheet = ({ scrollYProgress, range, frontImg, backImg, zIndexStart, zIndexEnd, isMobile = false }) => {
  const rotate = useTransform(scrollYProgress, range, [0, -180]);
  const z = useTransform(scrollYProgress, range, [zIndexStart, zIndexEnd]);
  
  const progress = useTransform(scrollYProgress, range, [0, 1]);
  const shadowOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.3, 0]);

  return (
    <motion.div
      style={{ 
        rotateY: rotate, 
        zIndex: z,
        transformStyle: "preserve-3d", 
        transformOrigin: "left center" 
      }}
      className={`absolute top-0 right-0 h-full bg-bseth-cream ${isMobile ? "w-full left-0" : "w-[50%]"}`} 
    >
      {/* --- frente --- */}
      <div className="absolute inset-0 w-full h-full bg-bseth-cream" style={{ backfaceVisibility: 'hidden' }}>
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none"/>
        <motion.div style={{ opacity: shadowOpacity }} className="absolute inset-0 bg-black pointer-events-none z-20" />
        <img src={frontImg} alt="frente" className="w-full h-full object-contain" />
      </div>

      {/* --- dorso --- */}
      <div 
        className="absolute inset-0 w-full h-full bg-bseth-cream"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
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

  return (
    <section ref={containerRef} className="relative h-[1000vh] bg-bseth-cream">
      
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[2000px]">

        {/* ========================================================= */}
        <div className="block md:hidden relative w-[85vw] h-[60vh]">
            

            <div className="absolute inset-0 w-full h-full z-0">
                 <img src={imgContraportada} alt="contraportada final" className="w-full h-full object-contain bg-bseth-cream" />
            </div>

            <Sheet 
                scrollYProgress={scrollYProgress} 
                range={[0.75, 0.95]} 
                zIndexStart={2} zIndexEnd={2} 
                frontImg={imgCierre} backImg={imgCierre} 
                isMobile={true} 
            />

            <Sheet 
                scrollYProgress={scrollYProgress} 
                range={[0.56, 0.75]} 
                zIndexStart={3} zIndexEnd={3} 
                frontImg={imgQuienesSomos} backImg={imgQuienesSomos} 
                isMobile={true} 
            />

            <Sheet 
                scrollYProgress={scrollYProgress} 
                range={[0.37, 0.56]} 
                zIndexStart={4} zIndexEnd={4} 
                frontImg={imgQueBuscamos} backImg={imgQueBuscamos} 
                isMobile={true} 
            />

            <Sheet 
                scrollYProgress={scrollYProgress} 
                range={[0.18, 0.37]} 
                zIndexStart={5} zIndexEnd={5} 
                frontImg={imgComoNacio} backImg={imgComoNacio} 
                isMobile={true} 
            />

            <Sheet 
                scrollYProgress={scrollYProgress} 
                range={[0.00, 0.18]} 
                zIndexStart={6} zIndexEnd={6} 
                frontImg={imgPortada} backImg={imgPortada} 
                isMobile={true} 
            />

        </div>



        <motion.div 
            style={{ x: xPosition }}
            className="hidden md:flex relative w-[900px] h-[85vh] justify-center items-center"
        >
          <Sheet 
            scrollYProgress={scrollYProgress} 
            range={[0.65, 0.90]} 
            zIndexStart={10} zIndexEnd={30}    
            frontImg={imgCierre} backImg={imgContraportada}
          />

          <Sheet 
            scrollYProgress={scrollYProgress} 
            range={[0.35, 0.60]} 
            zIndexStart={20} zIndexEnd={20} 
            frontImg={imgQueBuscamos} backImg={imgQuienesSomos}
          />
          
          <Sheet 
            scrollYProgress={scrollYProgress} 
            range={[0.05, 0.30]} 
            zIndexStart={30} zIndexEnd={10} 
            frontImg={imgPortada} backImg={imgComoNacio}
          />
        </motion.div>

      </div>
    </section>
  );
}