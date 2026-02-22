import { useRef, useEffect } from "react";

// --- TUS FOTOS ---
import imgLisbeth from "../assets/lis.jpg";
import imgLisbeth2 from "../assets/lis2.jpg";
import imgLisbeth3 from "../assets/lis3.jpg";
import imgLisbeth4 from "../assets/lis4.jpg";
import videoBrisa from "../assets/videobrisa.mp4"; 
import imgBrisa1 from "../assets/brisa.webp";
import imgBrisa2 from "../assets/brisa2.webp";
import imgBrisa3 from "../assets/brisa3.jpg";

export default function Narrative() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(() => {
                videoRef.current?.play().catch(() => {});
              });
            } else {
              // fallback
              setTimeout(() => {
                videoRef.current?.play().catch(() => {});
              }, 200);
            }
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 } 
    );

    if (videoRef.current) observer.observe(videoRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-screen bg-[#EBE5CE] flex flex-col justify-center items-center overflow-hidden py-8 
                 [content-visibility:auto] [contain-intrinsic-size:1px_100vh] will-change-transform backface-hidden"
    >
      
      {/* cont fluido */}
      <div className="w-[95vw] max-w-[1360px] transform-gpu">
        
        {/* header */}
        <div className="flex justify-between items-center text-[9px] font-helvetica tracking-[0.2em] text-black/40 mb-6 border-b border-black/5 pb-2 uppercase font-sans">
            <span>Page 01</span>
            <span className="w-8"></span> 
            <span>Page 02</span>
        </div>

        {/* grilla maestra */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start relative">

            {/* pliegue central */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 hidden md:block -translate-x-1/2" />

            {/* ============================================== */}
            {/* pág izq */}
            {/* ============================================== */}
            <div className="grid grid-cols-2 gap-3 px-2 md:px-8">
                
                {/* columna 1 */}
                <div className="flex flex-col gap-3 pt-6">
                    <div className="w-full aspect-[2/3] relative bg-[#E5E0C8]">
                        <img 
                            src={imgLisbeth3} 
                            alt="mood main" 
                            className="absolute inset-0 w-full h-full object-cover" 
                            loading="lazy" 
                            decoding="async" 
                        />
                    </div>
                    
                    <div className="w-[85%] aspect-[3/4] relative self-center bg-[#E5E0C8]">
                         <img 
                            src={imgLisbeth2} 
                            alt="mood detail" 
                            className="absolute inset-0 w-full h-full object-cover" 
                            loading="lazy" 
                            decoding="async"
                         />
                    </div>
                </div>

                {/* columna 2 */}
                <div className="flex flex-col gap-3">
                    <div className="w-full aspect-square relative bg-[#E5E0C8]">
                        <img 
                            src={imgLisbeth4} 
                            alt="texture" 
                            className="absolute inset-0 w-full h-full object-cover" 
                            loading="lazy" 
                            decoding="async"
                        />
                    </div>
                    
                    <div className="w-full aspect-[4/3] relative bg-[#E5E0C8]">
                        <img 
                            src={imgLisbeth} 
                            alt="texture detail" 
                            className="absolute inset-0 w-full h-full object-cover" 
                            loading="lazy" 
                            decoding="async"
                        />
                    </div>

                    {/* TEXTO */}
                    <div className="mt-4 pt-2 border-t border-black/10">
                        <h4 className="font-helvetica text-[13px] mb-1 text-black tracking-tight">lisbeth</h4>
                        <p className="text-[13px] leading-[1.4] text-black/90 font-helvetica tracking-tight">
                            <map name=""></map>me gusta decir ‘Lis con L’ cuando voy a Starbucks, también me gusta decir ‘Quispe con Q’ cuando tengo que renovar la cuota del gym. pero más me gusta que me digan ‘teacher!’ en clases, mientras enseño no solo inglés a los jóvenes, sino también lo amados y escuchados que son. y cómo amo estar en la cocina para hornear, saltear, hervir, batir, cortar y adorar.
                        </p>
                    </div>
                </div>
            </div>

            {/* ============================================== */}
            <div className="grid grid-cols-12 gap-3 content-start px-2 md:px-8">
                
                {/* BLOQUE SUPERIOR */}
                <div className="col-span-7 col-start-1 aspect-[4/5] relative bg-[#E5E0C8]">
                    <img 
                        src={imgBrisa1} 
                        alt="brisa main" 
                        className="absolute inset-0 w-full h-full object-cover" 
                        loading="lazy" 
                        decoding="async"
                    />
                </div>
                
                <div className="col-span-5 flex flex-col justify-end pb-2 pl-3">
                    <h4 className="font-helvetica text-[13px] mb-1 text-black tracking-tight">brisa</h4>
                    <div className="text-[13px] leading-[1.4] text-left text-black/80 font-helvetica tracking-tight">
                       amo leer, amo la música, amo el arte, amo la moda, amo el amor, amo el conocimiento y a los animales.<p className="mt-2">estudio ingeniería informática, construyo software y experiencias digitales impulsadas por la curiosidad, la creatividad y la funcionalidad.</p> 
                    </div>
                </div>

                <div className="col-span-12 flex justify-end py-2">
                     <div className="w-[60%] aspect-[16/9] relative bg-[#E5E0C8]">
                        <video 
                            ref={videoRef}
                            src={videoBrisa} 
                            muted 
                            loop 
                            playsInline 
                            preload="none" 
                            className="absolute inset-0 w-full h-full object-cover" 
                        />
                     </div>
                </div>

                <div className="col-span-6 aspect-[4/3] relative mt-1 bg-[#E5E0C8]">
                    <img 
                        src={imgBrisa2} 
                        alt="street style" 
                        className="absolute inset-0 w-full h-full object-cover" 
                        loading="lazy" 
                        decoding="async"
                    />
                </div>
                
                <div className="col-span-6 aspect-[3/4] relative mt-1 bg-[#E5E0C8]">
                    <img 
                        src={imgBrisa3} 
                        alt="full body" 
                        className="absolute inset-0 w-full h-full object-cover" 
                        loading="lazy" 
                        decoding="async"
                    />
                </div>

            </div>

        </div>
      </div>
    </section>
  );
}