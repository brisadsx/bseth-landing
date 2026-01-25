import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="bg-bseth-black py-32 px-4 border-t border-white/5 relative z-50 overflow-hidden">
      <div className="max-w-xl mx-auto text-center relative">
        
        {/* títulos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-helvetica text-2xl md:text-4xl text-bseth-cream mb-3 lowercase tracking-tighter">
            bseth list
          </h3>
          {/*  */}
          <p className="text-white/50 text-sm md:text-base mb-10 font-sans font-light tracking-wide lowercase">
            acceso anticipado al drop 001.
          </p>
        </motion.div>

        {/* msj de éxito */}
        <div className="h-20 relative"> 
          <AnimatePresence mode="wait">
            
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <p className="text-[#E4E4D0] font-sans text-lg tracking-tight flex items-center gap-2 lowercase">
                  <span className="text-xl">💌</span> ¡listo! ya estás adentro.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                className="flex flex-col md:flex-row gap-2 max-w-sm mx-auto"
              >
                {/* input */}
                <div className="relative flex-1 group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu email"
                    required
                    disabled={status === 'loading'}
                    className={`
                      w-full bg-transparent border-b border-white/20 
                      px-0 py-3 text-center md:text-left text-bseth-cream 
                      placeholder-white/20 focus:outline-none focus:border-bseth-cream/80 
                      transition-all duration-300 font-sans text-sm lowercase tracking-wide
                      ${status === 'error' ? 'border-red-400 text-red-100' : ''}
                    `}
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-bseth-cream transition-all duration-500 group-focus-within:w-full" />
                </div>
                
                {/*  */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-4 md:mt-0 md:ml-2 px-6 py-2 rounded-full border border-white/10 hover:border-white/40 hover:bg-white/5 text-bseth-cream text-xs lowercase tracking-widest transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-t-2 border-white rounded-full mx-auto"
                    />
                  ) : (
                    '→'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* mensaje de error */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-8 left-0 right-0 text-red-400/80 text-[10px] lowercase tracking-widest font-sans"
            >
              algo salió mal. intentá de nuevo.
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}