import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// texto de la historia
const STORY_TEXT = "En Bseth entendemos el diseño como un proceso que se construye con tiempo, escucha y prueba. Diseñamos bolsos pensados para el uso cotidiano, buscando equilibrio entre funcionalidad, orden y estilo. Nos interesa crear productos que acompañen distintos ritmos y momentos, prestando atención a los detalles y a cómo se usan en el día a día.";

const Char = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const color = useTransform(progress, range, ["#080808ff", "#FDFBF7"]); 
  
  return (
    <motion.span style={{ opacity, color }} className="relative">
      {children}
    </motion.span>
  );
};

export default function Narrative() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.8"] 
  });

  const words = STORY_TEXT.split(" ");
  
  const totalChars = STORY_TEXT.length;
  const step = 1 / totalChars;

  let globalCharIndex = 0;

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-bseth-black">
      
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        
        <span className="font-helvetica text-xs tracking-[0.0em] text-bseth-rose mb-8 opacity-80">
            nuestra filosofía
        </span>

        {/* flex wrap */}
        <p className="max-w-4xl text-xl md:text-5xl font-helvetica leading-tight text-center flex flex-wrap justify-center gap-x-[0.3em]">
          
          {words.map((word, wordIndex) => {
            return (
              <span key={wordIndex} className="whitespace-nowrap">
                {word.split("").map((char, charIndex) => {
                  
                  const start = globalCharIndex * step;
                  const end = start + step;
                  globalCharIndex++; 

                  return (
                    <Char key={charIndex} progress={scrollYProgress} range={[start, end]}>
                      {char}
                    </Char>
                  );
                })}
                
                {(() => { globalCharIndex++; return null; })()}
              </span>
            );
          })}
          
          {/* cursor parpadeante */}
          <motion.span 
            className="inline-block w-1 h-8 md:h-12 bg-bseth-rose ml-1 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </p>

      </div>
    </section>
  );
}