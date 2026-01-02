import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- TUS IMÁGENES ---
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

// --- DATOS ---
const ITEMS_DATA = [
  // --- BOLSO 1 (Grande - Izquierda) ---
  { id: 1,  img: imgLaptop,      name: "notebook",        targetBag: 1, startX: "-12vw", startY: "-60vh" }, 
  { id: 2,  img: imgLibro,       name: "libro de diseño", targetBag: 1, startX: "-18vw", startY: "-50vh" },
  { id: 3,  img: imgBotella,     name: "botella de agua", targetBag: 1, startX: "-8vw",  startY: "-45vh" },
  { id: 4,  img: imgAuriculares, name: "auriculares",     targetBag: 1, startX: "-15vw", startY: "-55vh" },
  { id: 5,  img: imgKindle,      name: "kindle",          targetBag: 1, startX: "-10vw", startY: "-65vh" },
  { id: 6,  img: imgTablet,      name: "ipad / tablet",   targetBag: 1, startX: "-20vw", startY: "-40vh" },
  { id: 11, img: imgCuaderno,    name: "cuaderno ideas",  targetBag: 1, startX: "-14vw", startY: "-70vh" },
  { id: 12, img: imgCelular,     name: "celular",         targetBag: 1, startX: "-6vw",  startY: "-35vh" },
  { id: 13, img: imgLentes,      name: "lentes de sol",   targetBag: 1, startX: "-16vw", startY: "-45vh" },
  { id: 14, img: imgLlaves,      name: "llaves de casa",  targetBag: 1, startX: "-12vw", startY: "-30vh" },
  { id: 16, img: imgCamara,      name: "cámara digital",  targetBag: 1, startX: "-9vw",  startY: "-50vh" },

  // --- BOLSO 2 (Chico - Derecha) ---
  { id: 7,  img: imgLlaves,      name: "llaves",          targetBag: 2, startX: "10vw",  startY: "-50vh" },
  { id: 8,  img: imgLentes,      name: "lentes",          targetBag: 2, startX: "15vw",  startY: "-40vh" },   
  { id: 9,  img: imgCelular,     name: "iphone",          targetBag: 2, startX: "8vw",   startY: "-60vh" },
  { id: 10, img: imgLibro,       name: "libro bolsillo",  targetBag: 2, startX: "12vw",  startY: "-45vh" },
  { id: 15, img: imgCamara,      name: "cámara compacta", targetBag: 2, startX: "18vw",  startY: "-55vh" }, 
];

// --- 1. COMPONENTE INDIVIDUAL DE LA LISTA ---
const ListItem = ({ item, scrollYProgress, align }) => {
  const globalIndex = ITEMS_DATA.findIndex(i => i.id === item.id);
  const trigger = 0.15 + (globalIndex * 0.03); 
  
  const opacity = useTransform(scrollYProgress, [trigger, trigger + 0.05], [0, 1]);
  const x = useTransform(scrollYProgress, [trigger, trigger + 0.05], [align === "left" ? 10 : -10, 0]);

  return (
    <motion.div style={{ opacity, x }} className="relative">
      <span className="font-sans font-light text-sm md:text-base text-bseth-black lowercase tracking-wide leading-none">
        {item.name}
      </span>
    </motion.div>
  );
};

// --- 2. LISTA (Contenedor) ---
const ItemList = ({ items, scrollYProgress, align }) => {
  return (
    <div className={`flex flex-col gap-0.5 ${align === "left" ? "text-right items-end" : "text-left items-start"}`}>
      {items.map((item) => (
        <ListItem 
          key={item.id} 
          item={item} 
          scrollYProgress={scrollYProgress} 
          align={align} 
        />
      ))}
    </div>
  );
};

// --- 3. OBJETO VOLADOR ---
const FlyingObject = ({ item, scrollYProgress }) => {
  const targetCoords = {
    1: { x: "-15vw", y: "8vh" }, // Ajustado un poco más afuera por el ancho nuevo
    2: { x: "15vw", y: "12vh" }, 
  };

  const target = targetCoords[item.targetBag];
  
  const index = ITEMS_DATA.indexOf(item);
  const startTrigger = 0.1 + (index * 0.03); 
  const endTrigger = startTrigger + 0.25; 

  const x = useTransform(scrollYProgress, [startTrigger, endTrigger], [item.startX, target.x]);
  const y = useTransform(scrollYProgress, [startTrigger, endTrigger], [item.startY, target.y]);
  const scale = useTransform(scrollYProgress, [endTrigger - 0.1, endTrigger], [1, 0]);
  const opacity = useTransform(scrollYProgress, [endTrigger - 0.05, endTrigger], [1, 0]);
  const rotate = useTransform(scrollYProgress, [startTrigger, endTrigger], [0, item.id % 2 === 0 ? 10 : -10]);

  return (
    <motion.div 
      style={{ x, y, scale, opacity, rotate }} 
      className="absolute z-20 pointer-events-none flex items-center justify-center top-0 left-0 w-full h-full"
    >
      <img 
        src={item.img} 
        alt={item.name} 
        className="w-16 md:w-20 h-auto drop-shadow-md object-contain" 
      />
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function BagPacker() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  return (
    <section ref={containerRef} className="relative h-[450vh] bg-bseth-brown">
      
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        
        {/* Título: Lo subí un poco más (top-8) para dar espacio */}
        <div className="absolute top-8 md:top-16 z-40 text-center w-full">
          <h2 className="font-serif text-3xl md:text-5xl text-bseth-cream mb-2 mix-blend-overlay opacity-90 lowercase">
            modelos pensados para vos
          </h2>
          <p className="text-sm md:text-lg font-sans text-bseth-black opacity-70 lowercase">
            con ayuda de las respuestas del formulario
          </p>
        </div>

        {/* --- ESCENARIO PRINCIPAL --- */}
        {/* CAMBIO 1: max-w-6xl para dar más ancho total y evitar colisión */}
        {/* CAMBIO 2: mt-0 (quitamos mt-20) para subir todo el bloque */}
        <div className="relative w-full max-w-6xl flex items-center justify-center h-[60vh] mt-0 gap-4 md:gap-8">

            {/* COLUMNA IZQ: Lista Bolso 1 */}
            {/* CAMBIO 3: pr-12 para empujar el texto a la izquierda, lejos del bolso */}
            <div className="w-1/3 hidden md:flex flex-col justify-center h-full pr-12">
               <ItemList 
                  items={ITEMS_DATA.filter(i => i.targetBag === 1)} 
                  scrollYProgress={scrollYProgress} 
                  align="left"
               />
            </div>

            {/* COLUMNA CENTRAL: Bolsos */}
            <div className="relative w-1/3 flex items-center justify-center h-full">
                
                {ITEMS_DATA.map((item) => (
                  <FlyingObject 
                    key={item.id} 
                    item={item} 
                    scrollYProgress={scrollYProgress} 
                  />
                ))}

                {/* Bolsos Flotantes */}
                {/* Ajusté translate-y para que estén centrados verticalmente con el nuevo layout */}
                <div className="relative z-10 flex gap-8 md:gap-16 items-end translate-y-10">
                    <motion.img 
                        src={bolsoGrandeImg} 
                        alt="Bolso Grande" 
                        className="w-32 md:w-52 h-auto drop-shadow-2xl object-contain"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.img 
                        src={bolsoChicoImg} 
                        alt="Bolso Chico" 
                        className="w-24 md:w-40 h-auto drop-shadow-2xl object-contain"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                </div>
            </div>

            {/* COLUMNA DER: Lista Bolso 2 */}
            {/* CAMBIO 4: pl-12 para empujar el texto a la derecha, lejos del bolso chico */}
            <div className="w-1/3 hidden md:flex flex-col justify-center h-full pl-12">
               <ItemList 
                  items={ITEMS_DATA.filter(i => i.targetBag === 2)} 
                  scrollYProgress={scrollYProgress} 
                  align="right"
               />
            </div>

        </div>
      </div>
    </section>
  );
}