export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };
  
  export const cardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0,  opacity: 1, transition: { type: "spring", stiffness: 120 } }
  };
  
  export const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0,  opacity: 1, transition: { duration: 0.6 } }
  };