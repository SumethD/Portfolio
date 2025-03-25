import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children, isVisible }) => {
  const slideVariants = {
    initial: {
      opacity: 0,
      x: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth easing
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 0.98,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideVariants}
          style={{ 
            width: '100%',
            position: 'relative',
            zIndex: 10, // Ensure content is above particles
            minHeight: '100vh'
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition; 