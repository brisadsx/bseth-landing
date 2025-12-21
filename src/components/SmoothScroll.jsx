import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Configuración "Mantequilla"
    const lenis = new Lenis({
      duration: 1.2, // Cuánto tarda en frenar (más alto = más suave)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Matemáticas de fluidez
      smoothWheel: true,
      touchMultiplier: 2, // Mejor control en celular
    });

    // El motor que actualiza el scroll en cada frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Limpieza cuando sales de la web
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}