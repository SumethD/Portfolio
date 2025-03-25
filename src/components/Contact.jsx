import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FuzzyText from '../formats/FuzzyText';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      setError('Failed to send message. Please try again later.');
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const formItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden z-[3] text-white"
    >
      {/* Background decorative elements */}
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
            className="h-[1px] bg-gray-700 mr-0 sm:mr-8 mb-4 sm:mb-0"
          ></motion.div>
          <motion.h2
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] font-light flex items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FuzzyText fontSize="clamp(1.875rem, 5vw, 4rem)" baseIntensity={0.2} hoverIntensity={0.5}>
              CONTACT
            </FuzzyText>
            <span className="ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm md:text-base tracking-wider">04</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20"
        >
          {/* Connect With Me - Enhanced design */}
          <motion.div 
            variants={containerVariants}
            className="border border-gray-800 hover:border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 flex items-center">
              <span className="inline-block w-6 h-[1px] bg-orange-500 mr-3"></span>
              Let&apos;s Connect
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-orange-500 mr-4 mt-1">
                  <i className="fas fa-envelope text-xl sm:text-2xl"></i>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl text-white mb-1">Email</h4>
                  <a href="mailto:sumeth.lokuliyana@gmail.com" className="text-base sm:text-lg text-gray-400 hover:text-gray-300 transition-colors duration-300">
                    sumethlokuliyana76@gmail.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-orange-500 mr-4 mt-1">
                  <i className="fas fa-map-marker-alt text-xl sm:text-2xl"></i>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl text-white mb-1">Location</h4>
                  <p className="text-base sm:text-lg text-gray-400">Melbourne, Australia</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
                  <span className="inline-block w-4 h-[1px] bg-orange-500 mr-2"></span>
                  Connect with me on
                </h4>
                <div className="flex space-x-6">
                  <motion.a
                    href="https://github.com/sumethjain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, color: "#fff" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-github"></i>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/sumethjain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, color: "#0077b5" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-linkedin"></i>
                  </motion.a>
                  <motion.a
                    href="https://twitter.com/sumethjain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, color: "#1da1f2" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-twitter"></i>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Contact Form - Enhanced design */}
          <motion.div 
            variants={containerVariants}
            className="border border-gray-800 hover:border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 flex items-center">
              <span className="inline-block w-6 h-[1px] bg-orange-500 mr-3"></span>
              Get In Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                variants={containerVariants}
                className="relative"
                custom={0}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black bg-opacity-50 border border-gray-800 focus:border-orange-500 rounded-none px-4 py-3 text-gray-300 text-base sm:text-lg focus:outline-none transition-all"
                  placeholder="Your Name"
                />
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                className="relative"
                custom={1}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black bg-opacity-50 border border-gray-800 focus:border-orange-500 rounded-none px-4 py-3 text-gray-300 text-base sm:text-lg focus:outline-none transition-all"
                  placeholder="Your Email"
                />
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                className="relative"
                custom={2}
              >
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-black bg-opacity-50 border border-gray-800 focus:border-orange-500 rounded-none px-4 py-3 text-gray-300 text-base sm:text-lg focus:outline-none transition-all"
                  placeholder="Subject"
                />
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                className="relative"
                custom={3}
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-black bg-opacity-50 border border-gray-800 focus:border-orange-500 rounded-none px-4 py-3 text-gray-300 text-base sm:text-lg focus:outline-none transition-all"
                  placeholder="Your Message"
                ></textarea>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                custom={4}
                className="text-right"
              >
                <motion.button
                  type="submit"
                  className="bg-transparent border border-orange-500 text-white px-8 py-3 text-base sm:text-lg transition-all duration-300 flex items-center justify-center hover:bg-orange-500 hover:bg-opacity-10"
                  whileHover={{ translateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span><i className="fas fa-spinner fa-spin mr-2"></i> Sending...</span>
                  ) : (
                    <span>Send Message <i className="fas fa-arrow-right ml-2"></i></span>
                  )}
                </motion.button>
              </motion.div>
              
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-3 text-green-500"
                >
                  <p className="text-base sm:text-lg">Your message has been sent successfully. I&apos;ll get back to you as soon as possible.</p>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-3 text-red-500"
                >
                  <p className="text-base sm:text-lg">{error}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
