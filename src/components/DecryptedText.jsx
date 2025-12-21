import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?';

export default function DecryptedText({ text, className }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let iteration = 0;
    let interval = null;

   
    const decrypt = () => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index]; 
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]; 
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval); 
      }

      iteration += 1 / 2; 
    };

   
    const startAnimation = () => {
        interval = setInterval(decrypt, 50); 
    }
    
    const timeout = setTimeout(startAnimation, 500); 

 
    return () => {
        clearTimeout(timeout);
        clearInterval(interval);
    }

  }, [text]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
}