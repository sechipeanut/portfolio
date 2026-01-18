import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const names = ['Franz', 'Ranzy', 'Sechi', 'Chi'];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentName = names[currentNameIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentName.length) {
          setDisplayedText(currentName.substring(0, displayedText.length + 1));
          setTypingSpeed(150);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentName.substring(0, displayedText.length - 1));
          setTypingSpeed(100);
        } else {
          // Finished deleting, move to next name
          setIsDeleting(false);
          setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentNameIndex, typingSpeed, names]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <motion.div 
          className="flex flex-col items-center text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Avatar */}
          <motion.div 
            className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-primary border-opacity-50"
            variants={itemVariants}
          >
            <img 
              src="https://cdn.franzvallesmedia.com/portfolio-assets/profile.jpg" 
              alt="Franz Valles"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Bio Content */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Hello, I'm{' '}
              <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                {displayedText}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
              20 | Full-Stack Developer | Open to Opportunities
            </p>
            
            <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
              A student studying Information Technology, passionate about building web applications and exploring new technologies. Skilled in JavaScript, React, Node.js, and more.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center pt-6"
            variants={itemVariants}
          >
            <motion.a 
              href="#experience"
              className="px-8 py-3 bg-primary hover:bg-opacity-80 text-white font-medium rounded-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="#contact"
              className="px-8 py-3 border-2 border-primary hover:bg-primary hover:bg-opacity-10 text-white font-medium rounded-lg"
              whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
