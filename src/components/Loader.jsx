import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTA TUS 8 FOTOS AQUÍ (Asegúrate de tenerlas en assets)

import bag1 from "../assets/bolso1loader.png"; 
import bag2 from "../assets/bolso2loader.png";
import bag3 from "../assets/bolso3loader.png";
import bag4 from "../assets/bolso4loader.png"; 
import bag5 from "../assets/bolso5loader.png";
import bag6 from "../assets/bolso6loader.png";
import bag7 from "../assets/bolso7loader.png";
import bag8 from "../assets/bolso8loader.png";


const IMAGES = [bag1, bag2, bag3, bag4, bag5, bag6, bag7, bag8]; 

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // simula el progreso de carga
  
    const duration = 2500; 
    const intervalTime = 70; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // act progreso
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(Math.floor(newProgress));

      // 2. cambio d fotos
      // carga de fotos  en %
      if (currentStep % 8 === 0) { 
        setCurrentImage((prev) => (prev + 1) % IMAGES.length);
      }

      // 3. termina el progeso
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500); 
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bseth-black text-bseth-cream cursor-wait"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", // efecto telon hacia arriba
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* --- imagen cambiante --- */}
      <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={IMAGES[currentImage]}
            alt="Loading Bag"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1 }} 
            transition={{ duration: 0.2 }} 
            className="absolute w-full h-full object-contain drop-shadow-2xl"
          />
        </AnimatePresence>
      </div>

      {/* --- contador --- */}
      <div className="relative z-10 mix-blend-difference"> {/* mix-blend hace que el texto se vea bien sobre fotos */}
        <h1 className="font-helvetica text-3xl md:text-8x1 leading-none tracking-tighter">
          {progress}%
        </h1>
      </div>
      
      {/* text chiquito abajo */}
      <p className="absolute bottom-32 font-helvetica text-[13px] tracking-[0.1em] text-bseth-rose">
       
      </p>

    </motion.div>
  );
}