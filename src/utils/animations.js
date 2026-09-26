export const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  },
  "fade-left": {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  },
  "fade-right": {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  },
  "fade-up-right": {
    hidden: { opacity: 0, y: 40, x: -40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  },
  "fade-up-left": {
    hidden: { opacity: 0, y: 40, x: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.45, ease: 'easeOut' }
    },
  },
  "zoom-in-up": {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    },
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 35, y: 30 },
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  },
};

export const leftReveal = variants["fade-right"];
export const rightReveal = variants["fade-left"];
export const upReveal = variants["fade-up"];

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05
    }
  }
};

export const cardVariant = variants["fade-up"];

export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export const modalContent = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 15,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};
