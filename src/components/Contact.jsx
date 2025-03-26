import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FuzzyText from '../formats/FuzzyText';

const Contact = () => {
  // For small screen detection
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // State for email popup modal
  const [showEmailModal, setShowEmailModal] = useState(false);
  // Form data for email
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct mailto URL with form data
    const mailtoUrl = `mailto:sumethlokuliyana76@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(`Name: ${emailData.name}\nEmail: ${emailData.email}\n\n${emailData.message}`)}`;
    window.location.href = mailtoUrl;
    setShowEmailModal(false);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showEmailModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEmailModal]);

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  // Improved animation for contact items
  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Function to open email modal
  const openEmailModal = (e) => {
    e.preventDefault();
    setShowEmailModal(true);
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden z-[3] text-white"
    >
      {/* Enhanced background decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-40 right-40 border border-gray-800 w-64 h-64 z-[1] hidden md:block"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-40 left-40 border border-gray-800 w-48 h-48 z-[1] hidden md:block"
      ></motion.div>
      
      {/* Animated particles/dots in background */}
      <div className="fixed inset-0 z-[-1]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ 
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              opacity: [
                Math.random() * 0.5 + 0.1,
                Math.random() * 0.5 + 0.3,
                Math.random() * 0.5 + 0.1
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 20 + 20,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-5xl mx-auto">
        {/* Section title with animation */}
        <motion.div 
          className="mb-12 sm:mb-16 flex flex-col sm:flex-row items-center text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-gradient-to-r from-orange-500/50 to-transparent mr-0 sm:mr-8 mb-4 sm:mb-0"
          ></motion.div>
          <motion.h2
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] font-light flex items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FuzzyText fontSize="3rem" baseIntensity={0.2} hoverIntensity={0.5}>
              CONTACT
            </FuzzyText>
            <span className="ml-2 sm:ml-3 text-orange-500/70 text-xs sm:text-sm md:text-base tracking-wider">04</span>
          </motion.h2>
        </motion.div>

        {/* Main content - Centered card design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* Enhanced Connect With Me */}
          <motion.div 
            variants={childVariants}
            className="border border-gray-800 hover:border-orange-500/30 bg-black bg-opacity-40 backdrop-blur-sm p-8 md:p-10 transition-all duration-500 shadow-xl hover:shadow-orange-500/5"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-white mb-8 flex items-center">
              <span className="inline-block w-6 h-[1px] bg-orange-500 mr-4"></span>
              Let&apos;s Connect
            </h3>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-10 border-l-2 border-orange-500/30 pl-4 py-1">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="space-y-8 mb-12">
              <motion.div 
                className="flex items-start group"
                custom={0}
                variants={contactItemVariants}
              >
                <div className="text-orange-500 mr-5 mt-1 text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl text-white mb-2 group-hover:text-orange-500/70 transition-colors duration-300">Email</h4>
                  <button 
                    onClick={openEmailModal}
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors duration-300 border-b border-transparent hover:border-orange-500/50 inline-block"
                  >
                    sumethlokuliyana76@gmail.com
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                custom={1}
                variants={contactItemVariants}
              >
                <div className="text-orange-500 mr-5 mt-1 text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl text-white mb-2 group-hover:text-orange-500/70 transition-colors duration-300">Location</h4>
                  <p className="text-base sm:text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Melbourne, Australia</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                custom={2}
                variants={contactItemVariants}
              >
                <div className="text-orange-500 mr-5 mt-1 text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl text-white mb-2 group-hover:text-orange-500/70 transition-colors duration-300">Response Time</h4>
                  <p className="text-base sm:text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Usually within 24-48 hours</p>
                </div>
              </motion.div>
            </div>
            
            {/* Enhanced social media section */}
            <motion.div 
              className="mt-12 border-t border-gray-800 pt-8"
              custom={3}
              variants={contactItemVariants}
            >
              <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-6 flex items-center">
                <span className="inline-block w-4 h-[1px] bg-orange-500 mr-3"></span>
                Connect with me on
              </h4>
              <div className="flex space-x-8 justify-center sm:justify-start">
                <motion.a
                  href="https://github.com/SumethD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.1, color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-github"></i>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sumeth-lokuliyana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-400 hover:text-[#0077b5] transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.1, color: "#0077b5" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-linkedin"></i>
                </motion.a>
                <motion.button
                  onClick={openEmailModal}
                  className="text-3xl text-gray-400 hover:text-orange-500 transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.1, color: "#ff5000" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-envelope"></i>
                </motion.button>
              </div>
            </motion.div>
            
            {/* Direct action button */}
            <motion.div 
              className="mt-12 text-center"
              custom={4}
              variants={contactItemVariants}
            >
              <motion.button
                onClick={openEmailModal}
                className="inline-block bg-transparent border border-orange-500 text-white px-8 py-4 text-base sm:text-lg transition-all duration-300 hover:bg-orange-500/10 group relative overflow-hidden"
                whileHover={{ translateY: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Send Me A Message <i className="fas fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-500/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Email Modal Popup with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmailModal(false)}
            />
            
            {/* Modal container */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-lg mx-4 sm:mx-auto bg-black border border-gray-800 shadow-2xl shadow-orange-500/10 z-10"
            >
              {/* Orange top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-orange-400"></div>
              
              {/* Close button */}
              <button 
                onClick={() => setShowEmailModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              
              {/* Modal content */}
              <div className="p-8">
                <h3 className="text-2xl text-white mb-6 flex items-center">
                  <span className="text-orange-500 mr-3"><i className="fas fa-paper-plane"></i></span>
                  Send Me A Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={emailData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-900/50 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={emailData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-900/50 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={emailData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={emailData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full bg-gray-900/50 border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-colors"
                    ></textarea>
                  </div>
                  
                  {/* Submit button */}
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      className="bg-black border border-orange-500 text-white px-6 py-3 text-sm sm:text-base flex items-center group relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">
                        SEND MESSAGE <i className="fas fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-orange-500/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    </motion.button>
                  </div>
                </form>
                
                {/* Animated decorative elements in modal */}
                <div className="absolute bottom-0 left-0 w-20 h-16 border-l border-b border-gray-800 opacity-50"></div>
                <div className="absolute top-0 right-0 w-20 h-16 border-r border-t border-gray-800 opacity-50"></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Contact;
