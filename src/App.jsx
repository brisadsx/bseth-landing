import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import SmoothScroll from './components/SmoothScroll';
import BookScroll from './components/BookScroll'; 
import Narrative from './components/Narrative';
import BagPacker from './components/BagPacker';
import DecryptedText from './components/DecryptedText'; 
import Loader from './components/Loader'; 

import bsethLogo from './assets/lgbseth.png'; 

import bag1 from "./assets/bolso1loader.png";
import bag2 from "./assets/bolso2loader.png";
import bag3 from "./assets/bolso3loader.png";
import bag4 from "./assets/bolso4loader.png";
import bag5 from "./assets/bolso5loader.png";
import bag6 from "./assets/bolso6loader.png";
import bag8 from "./assets/bolso8loader.png";

const BAGS = [bag1, bag2, bag3, bag4, bag5, bag6, bag8];

const ShootingBag = ({ img, index }) => {
  const randomDelay = index * 1.5;
  const randomDuration = 12 + (index % 4); 
  
  const startX = (index % 2 === 0) ? "-20vw" : "30vw"; 
  const startY = "-20vh";
  const endX = (index % 2 === 0) ? "120vw" : "150vw";
  const endY = "120vh";

  return (
    <motion.img
      src={img}
      alt="Shooting Bag"
      className="absolute top-0 left-0 pointer-events-none opacity-10 mix-blend-overlay w-32 md:w-48 blur-[2px]"
      style={{ filter: "grayscale(100%) brightness(1.5)" }}
      initial={{ x: startX, y: startY, opacity: 0, rotate: -15 }}
      animate={{ 
        x: endX, y: endY, 
        opacity: [0, 1, 1, 0], 
        rotate: 15 
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: "linear", 
        repeat: Infinity, 
        repeatDelay: randomDelay / 2 
      }}
    />
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [randomStyle, setRandomStyle] = useState(null);
  // Estado para saber si es móvil y ajustar las coordenadas del cartelito
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar tamaño de pantalla al inicio y al cambiar tamaño
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Chequear al montar
    window.addEventListener('resize', handleResize);

    // loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    const colors = [
        { bg: "bg-[#C8A6A0]", text: "text-[#ECE4CE]" }, 
        { bg: "bg-[#8E9F6C]", text: "text-[#ECE4CE]" }, 
        { bg: "bg-[#ECE4CE]", text: "text-[#111111]" }, 
        { bg: "bg-[#BAAD93]", text: "text-[#111111]" }, 
    ];

    // Usamos el estado isMobile para definir las posiciones
    const positions = isMobile 
        ? [ // Coordenadas MÓVIL (Más separadas para no chocar íconos grandes)
            { x: -65, y: -75, r: -8 },
            { x: 65, y: -75, r: 8 }, 
            { x: 0, y: -90, r: 0 },  
            { x: 60, y: 60, r: -12 }, 
            { x: -60, y: 60, r: 12 }, 
          ]
        : [ // Coordenadas PC ORIGINALES (Tus coordenadas exactas)
            { x: -75, y: -45, r: -5 },
            { x: 75, y: -45, r: 5 },  
            { x: 0, y: -60, r: 0 },   
            { x: 85, y: 15, r: -8 },  
            { x: -85, y: 15, r: 8 },  
          ];

    const changeStyle = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomPos = positions[Math.floor(Math.random() * positions.length)];
        setRandomStyle({ ...randomColor, ...randomPos, id: Date.now() });
    };

    changeStyle();

    const interval = setInterval(changeStyle, 2500);

    return () => {
        clearTimeout(timer);
        clearInterval(interval); 
        window.removeEventListener('resize', handleResize);
    }; 
  }, [isMobile]); // Añadimos isMobile a las dependencias para que se actualice si cambia la pantalla
  // -------------------------------------

  const { scrollY } = useScroll();
  const flyUp = useTransform(scrollY, [0, 500], ["0%", "-150%"]);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <>
      <AnimatePresence mode='wait'>
        {loading && <Loader key="loader" />} 
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <div className="bg-bseth-brown min-h-screen font-sans w-full text-bseth-cream selection:bg-bseth-rose selection:text-bseth-black">
            
            {/* hero */}
            <section className="h-screen w-full relative flex flex-col justify-center items-center text-center bg-bseth-brown overflow-hidden px-4">

              {/* luz central */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] pointer-events-none">
              </div>

              {/* bolsos (flyup) */}
              <motion.div 
                style={{ y: flyUp }}
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
              >
                {BAGS.map((bag, index) => (
                  <ShootingBag key={index} img={bag} index={index} />
                ))}
              </motion.div>

              {/* content (flyup) */}
              <motion.div 
                initial="hidden" animate="visible" variants={fadeIn} 
                style={{ y: flyUp }}
                className="relative z-10 -top-40 md:-top-32 mb-6"
              >
                <span className="text-xl md:text-xl font-satoshi font-light tracking-0 text-bseth-cream opacity-70">
                  te acompaña
                </span>
              </motion.div>

              <motion.div 
                initial="hidden" animate="visible" variants={fadeIn} 
                style={{ y: flyUp }}
                className="relative z-10"
              >
                  <img src={bsethLogo} alt="Bseth Logo" className="w-56 md:w-80 h-auto mx-auto drop-shadow-2xl"/>
              </motion.div>

              <motion.div 
                initial="hidden" animate="visible" variants={fadeIn} 
                style={{ y: flyUp }}
                className="relative z-10 flex flex-col items-center top-40"
              >
                <div className="mb-1">
                  <span className="text-xl md:text-xl font-satoshi tracking-0 text-bseth-cream opacity-70">
                    por
                  </span>
                </div>

                <div className="text-xl md:text-xl font-satoshi text-bseth-rose mb-4">
                    <DecryptedText text="Lisbeth & Brisa" />
                </div>

                <div className="mt-6 text-bseth-rose animate-bounce opacity-80 text-3xl">↓</div>
              </motion.div>
            </section>

            {/* otras secciones */}
            <div className="relative z-20 border-t border-white/10">
              <BookScroll />
            </div>

            <div className="relative z-20 border-t border-white/10">
              <Narrative />
            </div>

            <div className="relative z-20 border-t border-white/10">
              <BagPacker />
            </div>

            {/* footer */}
            <section className="min-h-screen w-full bg-bseth-black flex flex-col items-center justify-center text-center text-bseth-cream p-6 relative z-20 border-t border-white/10">
              
              {/* Título: Gigante en móvil, original en PC */}
              <h2 className="text-[22vw] md:text-9xl font-drowner mb-10 text-bseth-cream leading-none mt-10">
                gracias!
              </h2>
              
              {/* Texto: Más grande en móvil, original en PC */}
              <div className="max-w-2xl text-xl md:text-2xl mb-20 px-4 font-helvetica opacity-80 flex-col gap-2">
                <p className="m-0 tracking-tight leading-snug">esto es solo el inicio de un proyecto</p>
                <p className="m-0 tracking-tight leading-snug">pensado para acompañarte</p>
              </div>
              
              {/* cont icons - Volvemos a gap-8 y mt-10 original en PC */}
              <div className="relative flex gap-8 md:gap-8 mt-10 md:mt-10 items-center justify-center">

                  {randomStyle && (
                    <motion.div
                        key={randomStyle.id} 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                            scale: 1, 
                            opacity: 1, 
                            x: randomStyle.x, 
                            y: randomStyle.y, 
                            rotate: randomStyle.r 
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        // Cartelito: Grande en móvil (text-sm, px-4), Original chico en PC (md:text-xs, md:px-3)
                        className={`absolute z-30 px-4 py-2 md:px-3 md:py-1.5 ${randomStyle.bg} ${randomStyle.text} font-helvetica text-sm md:text-xs font-medium lowercase tracking-tighter rounded-full shadow-lg pointer-events-none whitespace-nowrap`}
                    >
                        seguinos!
                    </motion.div>
                  )}

                  {/* ig */}
                  <motion.a 
                      href="https://www.instagram.com/bseth.ar/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-bg-bseth-rose opacity-60 hover:opacity-100 transition-opacity"
                      whileHover={{ y: -4, scale: 1.1 }} 
                      whileTap={{ scale: 0.95 }}
                  >
                      {/* ARREGLO CLAVE: w-8 (32px) en móvil, w-6 (24px original) en PC */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                  </motion.a>

                  {/* tt */}
                  <motion.a 
                      href="https://www.tiktok.com/@bseth.ar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#EBE5CE] opacity-60 hover:opacity-100 transition-opacity"
                      whileHover={{ y: -4, scale: 1.1 }} 
                      whileTap={{ scale: 0.95 }}
                  >
                      {/* ARREGLO CLAVE: w-8 (32px) en móvil, w-6 (24px original) en PC */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                      </svg>
                  </motion.a>

              </div>
              <p className="absolute bottom-6 text-[13px] opacity-20 font-sans">© 2026 Bseth</p>
            </section>

          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;