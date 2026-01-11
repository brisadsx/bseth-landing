import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import bolsoGrandeImg from "../assets/molde1.png"; 
import bolsoChicoImg from "../assets/molde2.png";  
import imgLaptop from "../assets/notebook.png"; 
import imgLibro from "../assets/libro.png";
import imgBotella from "../assets/botella.png";
import imgLlaves from "../assets/llaves.png";
import imgLentes from "../assets/lentes.png";
import imgCelular from "../assets/celular.png";
import imgKindle from "../assets/kindle.png";
import imgAuriculares from "../assets/auriculares.png";
import imgTablet from "../assets/tablet.png";
import imgCuaderno from "../assets/cuaderno.png";
import imgCamara from "../assets/camara.png";

// data
const ITEMS_DATA = [
  { id: 1,  img: imgLaptop,      name: "notebook",       targetBag: 1, startX: "-6vw",  startY: "-25vh" }, 
  { id: 2,  img: imgLibro,       name: "libros",         targetBag: 1, startX: "-12vw", startY: "-20vh" },
  { id: 3,  img: imgBotella,     name: "botella de agua", targetBag: 1, startX: "-4vw",  startY: "-15vh" },
  { id: 4,  img: imgAuriculares, name: "auriculares",     targetBag: 1, startX: "-10vw", startY: "-22vh" },
  { id: 5,  img: imgKindle,      name: "kindle",          targetBag: 1, startX: "-8vw",  startY: "-28vh" },
  { id: 6,  img: imgTablet,      name: "ipad / tablet",   targetBag: 1, startX: "-14vw", startY: "-18vh" },
  { id: 11, img: imgCuaderno,    name: "cuaderno",  targetBag: 1, startX: "-9vw",  startY: "-30vh" },
  { id: 12, img: imgCelular,     name: "celular",         targetBag: 1, startX: "-3vw",  startY: "-12vh" },
  { id: 13, img: imgLentes,      name: "lentes",   targetBag: 1, startX: "-11vw", startY: "-16vh" },
  { id: 14, img: imgLlaves,      name: "llaves",  targetBag: 1, startX: "-7vw",  startY: "-10vh" },
  { id: 16, img: imgCamara,      name: "cámara digital",  targetBag: 1, startX: "-5vw",  startY: "-24vh" },

  { id: 7,  img: imgLlaves,           name: "llaves",          targetBag: 2, startX: "6vw",   startY: "-20vh" },
  { id: 8,  img: imgLentes,           name: "lentes",          targetBag: 2, startX: "10vw",  startY: "-15vh" },   
  { id: 9,  img: imgCelular,     name: "celular",          targetBag: 2, startX: "4vw",   startY: "-25vh" },
  { id: 10, img: imgLibro,       name: "libro bolsillo",  targetBag: 2, startX: "8vw",   startY: "-18vh" },
  { id: 15, img: imgCamara,      name: "cámara compacta", targetBag: 2, startX: "12vw",  startY: "-22vh" }, 
];

// --- comp pc ---
const ListItem = ({ item, scrollYProgress, align }) => {
  const globalIndex = ITEMS_DATA.findIndex(i => i.id === item.id);
  const trigger = 0.1 + (globalIndex * 0.02); 
  
  const opacity = useTransform(scrollYProgress, [trigger, trigger + 0.05], [0, 1]);
  const x = useTransform(scrollYProgress, [trigger, trigger + 0.05], [align === "left" ? 10 : -10, 0]);

  return (
    <motion.div style={{ opacity, x }} className="relative block"> 
      <span className="font-sans font-medium text-[17px] text-bseth-black lowercase tracking-tight leading-[0.85] opacity-80 block">
        {item.name}
      </span>
    </motion.div>
  );
};

// --- comp lista ---
const MobileListItem = ({ item }) => {
    return (
      <div className="relative block"> 
        <span className="font-sans font-medium text-[13px] text-bseth-black lowercase tracking-tight leading-[1] opacity-80 block">
          {item.name}
        </span>
      </div>
    );
};

const ItemList = ({ items, scrollYProgress, align, isMobile = false }) => {
  return (
    <div className={`flex flex-col gap-0 ${align === "left" ? "text-right items-end" : "text-left items-start"}`}>
      {items.map((item) => (
         isMobile ? (
            <MobileListItem key={item.id} item={item} />
         ) : (
            <ListItem 
                key={item.id} 
                item={item} 
                scrollYProgress={scrollYProgress} 
                align={align} 
            />
         )
      ))}
    </div>
  );
};

// --- comp obj  ---
const FlyingObject = ({ item, scrollYProgress, isMobile }) => {
  
  // 1. target (bolso)
  const targetCoords = isMobile ? {

      1: { x: "22vw", y: "-18vh" }, 
      2: { x: "-22vw", y: "18vh" },
  } : {
      1: { x: "-18vw", y: "8vh" },
      2: { x: "18vw", y: "10vh" },
  };

  const target = targetCoords[item.targetBag];

  // 2. start (animacion)
  const mobileStartX = item.targetBag === 1 
      ? "-40vw" 
      : "40vw"; 

  const startX = isMobile ? mobileStartX : item.startX;
  const startY = isMobile ? (item.targetBag === 1 ? "-30vh" : "30vh") : item.startY;

  const index = ITEMS_DATA.indexOf(item);
  const startTrigger = 0.05 + (index * 0.025); 
  const endTrigger = startTrigger + 0.3; 

  const x = useTransform(scrollYProgress, [startTrigger, endTrigger], [startX, target.x]);
  const y = useTransform(scrollYProgress, [startTrigger, endTrigger], [startY, target.y]);
  
  const opacityIn = useTransform(scrollYProgress, [startTrigger, startTrigger + 0.05], [0, 1]);
  const opacityOut = useTransform(scrollYProgress, [endTrigger - 0.05, endTrigger], [1, 0]);
  const opacity = useTransform(scrollYProgress, (v) => v < (startTrigger + 0.1) ? opacityIn.get() : opacityOut.get());

  const scaleIn = useTransform(scrollYProgress, [startTrigger, startTrigger + 0.1], [0.8, 1]);
  const scaleOut = useTransform(scrollYProgress, [endTrigger - 0.1, endTrigger], [1, 0.4]);
  const scale = useTransform(scrollYProgress, (v) => v < (startTrigger + 0.2) ? scaleIn.get() : scaleOut.get());

  const rotate = useTransform(scrollYProgress, [startTrigger, endTrigger], [0, item.id % 2 === 0 ? 15 : -15]);

  return (
    <motion.div 
      style={{ x, y, scale, opacity, rotate }} 
      className="absolute z-30 pointer-events-none flex items-center justify-center top-0 left-0 w-full h-full will-change-transform"
    >
      <img 
        src={item.img} 
        alt={item.name} 
        decoding="async"
        className="w-14 md:w-20 h-auto drop-shadow-sm object-contain" 
      />
    </motion.div>
  );
};

export default function BagPacker() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  return (
    <section ref={containerRef} className="relative h-[250vh] md:h-[400vh] bg-bseth-olive">
      
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        
        {/* titulo */}
        <div className="absolute top-0 md:top-20 z-40 text-center w-full pt-24 md:pt-0">
          <h2 className="font-helvetica text-3xl md:text-5xl text-bseth-cream mb-3 mix-blend-overlay opacity-90 lowercase tracking-tighter">
            modelos pensados para vos
          </h2>
          <p className="text-base md:text-x2 font-helvetica text-bseth-black opacity-60 lowercase tracking-tight">
            con ayuda de las respuestas que dejen en el {" "}
            <a 
              href="https://forms.gle/gGu3howRXPYg67y66" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-2 hover:opacity-50 transition-opacity cursor-pointer"
            >
            formulario
            </a>
          </p>
        </div>

        {/* cont central */}
        <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-center h-[60vh] mt-10 md:mt-0">

            <div className="absolute inset-0 pointer-events-none z-50">
                {ITEMS_DATA.map((item) => (
                  <FlyingObject 
                    key={item.id} 
                    item={item} 
                    scrollYProgress={scrollYProgress} 
                    isMobile={isMobile}
                  />
                ))}
            </div>

            {/* pc */}
            {/* ======================================================= */}
            <div className="hidden md:flex w-full h-full items-center justify-center">
                <div className="w-1/3 flex flex-col justify-center h-full pr-12 md:pr-20">
                    <ItemList 
                        items={ITEMS_DATA.filter(i => i.targetBag === 1)} 
                        scrollYProgress={scrollYProgress} 
                        align="left"
                    />
                </div>

                <div className="relative w-1/3 flex items-center justify-center h-full">
                    <div className="relative z-10 flex gap-12 md:gap-32 items-end translate-y-16">
                        <motion.img 
                            src={bolsoGrandeImg} alt="Bolso Grande" decoding="async"
                            className="w-36 md:w-60 h-auto drop-shadow-2xl object-contain"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.img 
                            src={bolsoChicoImg} alt="Bolso Chico" decoding="async"
                            className="w-28 md:w-44 h-auto drop-shadow-2xl object-contain"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                    </div>
                </div>

                <div className="w-1/3 flex flex-col justify-center h-full pl-24 md:pl-32">
                    <ItemList 
                        items={ITEMS_DATA.filter(i => i.targetBag === 2)} 
                        scrollYProgress={scrollYProgress} 
                        align="right"
                    />
                </div>
            </div>

            {/* celular */}
            {/* ======================================================= */}
            <div className="flex md:hidden flex-col w-full h-[65vh] justify-center mt-20 gap-16 relative z-10">
                
                <div className="flex items-center justify-between w-full px-2">
                    <div className="w-1/2 flex justify-end pr-4">
                        <ItemList 
                            items={ITEMS_DATA.filter(i => i.targetBag === 1)} 
                            align="left"
                            isMobile={true}
                        />
                    </div>
                    <div className="w-1/2 flex justify-center">
                        <img 
                            src={bolsoGrandeImg} alt="Bolso Grande" 
                            className="w-[35vw] max-w-[150px] h-auto drop-shadow-xl"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between w-full px-2">
                    <div className="w-1/2 flex justify-center">
                        <img 
                            src={bolsoChicoImg} alt="Bolso Chico" 
                            className="w-[28vw] max-w-[120px] h-auto drop-shadow-xl"
                        />
                    </div>
                    <div className="w-1/2 flex justify-start pl-4">
                        <ItemList 
                            items={ITEMS_DATA.filter(i => i.targetBag === 2)} 
                            align="right"
                            isMobile={true}
                        />
                    </div>
                </div>

            </div>

        </div>

      </div>
    </section>
  );
}