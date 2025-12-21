import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BagPacker() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });


  const bookX = useTransform(scrollYProgress, [0.3, 0.8], [-500, 0]);
  const bookY = useTransform(scrollYProgress, [0.3, 0.8], [-200, 50]);
  const bookScale = useTransform(scrollYProgress, [0.7, 0.8], [0.8, 0]); 

  const laptopX = useTransform(scrollYProgress, [0.3, 0.8], [500, 0]);
  const laptopScale = useTransform(scrollYProgress, [0.75, 0.85], [0.8, 0]);

  const snackY = useTransform(scrollYProgress, [0.3, 0.8], [400, 0]);
  const snackScale = useTransform(scrollYProgress, [0.8, 0.9], [0.8, 0]);

  const keysX = useTransform(scrollYProgress, [0.3, 0.8], [400, 0]);
  const keysY = useTransform(scrollYProgress, [0.3, 0.8], [-300, 0]);
  const keysScale = useTransform(scrollYProgress, [0.7, 0.8], [0.8, 0]);

  const bagsScale = useTransform(scrollYProgress, [0.5, 0.8], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-bseth-brown">
      
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        
        <div className="text-center mb-8 relative z-30">
          <h2 className="font-serif text-4xl md:text-5xl text-bseth-brown mb-2">
            ¿Qué entra en un bolso de Bseth?
          </h2>
          <p className="text-base md:text-lg font-sans text-bseth-black max-w-lg mx-auto opacity-80">
            pensamos en tu comodidad
          </p>
        </div>


        <div className="relative w-full max-w-4xl flex items-center justify-center h-[400px]">

            {/* objetos */}
            <motion.div style={{ x: bookX, y: bookY, scale: bookScale }} className="absolute z-20 pointer-events-none">
                <span className="text-6xl drop-shadow-md">📚</span>
            </motion.div>
            <motion.div style={{ x: laptopX, scale: laptopScale }} className="absolute z-20 pointer-events-none">
                <span className="text-6xl drop-shadow-md">💻</span>
            </motion.div>
            <motion.div style={{ y: snackY, scale: snackScale }} className="absolute z-20 pointer-events-none">
                <span className="text-5xl drop-shadow-md">🍎</span> 
            </motion.div>
            <motion.div style={{ x: keysX, y: keysY, scale: keysScale }} className="absolute z-20 pointer-events-none">
                <span className="text-5xl drop-shadow-md">🔑</span> 
            </motion.div>

            <motion.div 
                style={{ scale: bagsScale }} 
                className="z-10 flex gap-8 md:gap-12 items-end"
            >
                <img 
                    src="/bolso-grande.png" alt="Bolso 1"
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/200x280/8C6A58/ffffff?text=Modelo+1'}}
                    className="w-[140px] md:w-[220px] h-auto drop-shadow-xl object-contain"
                />
                <img 
                    src="/bolso-cajita.png" alt="Bolso 2"
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/160x160/BAAD93/ffffff?text=Modelo+2'}}
                    className="w-[120px] md:w-[180px] h-auto drop-shadow-xl object-contain"
                />
            </motion.div>

        </div>
      </div>
    </section>
  );
}