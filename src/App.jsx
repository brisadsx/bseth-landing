import React, { useState } from 'react';
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

  const { scrollY } = useScroll();

  const flyUp = useTransform(scrollY, [0, 500], ["0%", "-150%"]);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <>
      <AnimatePresence mode='wait'>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <SmoothScroll>
          <div className="bg-bseth-brown min-h-screen font-sans w-full text-bseth-cream selection:bg-bseth-rose selection:text-bseth-black">
            
            {/* HERO SECTION */}
            <section className="h-screen w-full relative flex flex-col justify-center items-center text-center bg-bseth-black overflow-hidden px-4">

              {/* LUZ DE FONDO */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] pointer-events-none">
              </div>

              {/* BOLSOS (Con animación de subida flyUp) */}
              <motion.div 
                style={{ y: flyUp }}
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
              >
                {BAGS.map((bag, index) => (
                  <ShootingBag key={index} img={bag} index={index} />
                ))}
              </motion.div>

              {/* CONTENIDOS (Con animación de subida flyUp) */}
              <motion.div 
                initial="hidden" animate="visible" variants={fadeIn} 
                style={{ y: flyUp }}
                className="relative z-10 -top-40 mb-6"
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
                  <img src={bsethLogo} alt="Bseth Logo" className="w-46 md:w-60 h-auto mx-auto drop-shadow-2xl"/>
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

                <div className="text-xl md:text-xl font-satoshi text-bseth-brown opacity-70 mb-4">
                    <DecryptedText text="Lisbeth & Brisa" />
                </div>

                <div className="mt-6 text-bseth-rose animate-bounce opacity-80 text-3xl">↓</div>
              </motion.div>
            </section>

            {/* OTRAS SECCIONES */}
            <div className="relative z-20 border-t border-white/10">
              <BookScroll />
            </div>

            <div className="relative z-20 border-t border-white/10">
              <Narrative />
            </div>

            <div className="relative z-20 border-t border-white/10">
              <BagPacker />
            </div>

            {/* FOOTER */}
            <section className="min-h-screen w-full bg-bseth-black flex flex-col items-center justify-center text-center text-bseth-cream p-6 relative z-20 border-t border-white/10">
              <h2 className="text-6xl md:text-9xl font-drowner mb-10 text-bseth-cream">gracias!</h2>
              <div className="max-w-2xl text-lg md:text-2xl mb-16 px-4 font-sans font-light opacity-80 leading-relaxed">
                <p className="mb-6">"nuestra expectativa es que Bseth sea más que un bolso, sea tu compañero de batalla."</p>
              </div>
              <button onClick={() => window.location.href = "https://tu-tienda-ecommerce.com"} className="group relative bg-bseth-rose text-bseth-black px-16 py-6 rounded-full text-xl md:text-2xl font-bold overflow-hidden transition-transform hover:scale-105">
                <span className="relative z-10 font-drowner tracking-wide">ir a la tienda</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <p className="absolute bottom-4 text-[10px] opacity-20 font-sans">© 2025 Bseth</p>
            </section>

          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;