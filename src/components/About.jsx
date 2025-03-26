import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FuzzyText from '../formats/FuzzyText';

// Enhanced FadeInSection Component with Framer Motion
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={domRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  return (
    <section className="min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden z-[3] text-white">
      {/* Background decorative elements with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-32 right-32 border border-gray-800 w-64 h-64 z-[1] hidden md:block"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-32 left-32 border border-gray-800 w-48 h-48 z-[1] hidden md:block"
      ></motion.div>
      
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <FadeInSection delay={0.1}>
          <div className="mb-16 flex flex-col sm:flex-row items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1px] bg-gray-700 mr-0 sm:mr-8 mb-4 sm:mb-0"
            ></motion.div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] font-light flex items-center">
              <FuzzyText 
                fontSize="3rem" 
                baseIntensity={0.2} 
                hoverIntensity={0.5}
              >
                ABOUT ME
              </FuzzyText>
              <span className="ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm md:text-base tracking-wider">01</span>
            </h2>
          </div>
        </FadeInSection>

        {/* Profile - Enhanced with better card design */}
        <FadeInSection delay={0.2}>
          <div className="mb-16 border border-gray-800 hover:border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 space-y-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl tracking-wider text-white flex items-center">
              <span className="inline-block w-8 h-[1px] bg-orange-500 mr-4"></span>
              PROFILE
            </h3>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300">
              Hey, I’m Sumeth Lokuliyana — a software engineer who loves building cool, scalable stuff that actually works. Whether it’s modernizing old-school systems or coming up with fresh new apps, I like mixing solid tech skills with creative problem-solving to get real results.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300">
              At IFFA Windsor and Leica Biosystems, I worked on some pretty key projects—led migrations, built user-friendly tools, and helped boost performance by over 60%. It was all about making things faster, smoother, and just better for the people using them.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300">
              On the side, I’ve also dived deep into the wild world of crypto trading. Got my hands dirty with perpetuals, took a few hits (classic), but came out with a sharp interest in quant strategies and how markets tick. It’s been a ride, but one that taught me a lot and keeps me curious.
            </p>
          </div>
        </FadeInSection>

        {/* Skills - Enhanced with card design and layout */}
        <FadeInSection delay={0.3}>
          <div className="mb-16 border border-gray-800 hover:border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl md:text-3xl tracking-wider text-white mb-8 flex items-center">
              <span className="inline-block w-8 h-[1px] bg-orange-500 mr-4"></span>
              CORE SKILLS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 bg-black bg-opacity-40"
              >
                <h4 className="text-lg sm:text-xl md:text-2xl text-white mb-4 flex items-center">
                  <span className="inline-block w-4 h-[1px] bg-orange-500 mr-2"></span>
                  Frontend & UI/UX
                </h4>
                <ul className="text-base sm:text-lg text-gray-300 space-y-3">
                  {["React.js / Next.js", "TypeScript", "Tailwind CSS"].map((skill, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.5 }}
                    >
                      <div className="w-3 h-[1px] bg-gray-500 mr-3"></div>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 bg-black bg-opacity-40"
              >
                <h4 className="text-lg sm:text-xl md:text-2xl text-white mb-4 flex items-center">
                  <span className="inline-block w-4 h-[1px] bg-orange-500 mr-2"></span>
                  Backend & DevOps
                </h4>
                <ul className="text-base sm:text-lg text-gray-300 space-y-3">
                  {["Node.js / Express", "Python / Django / Flask", "Java / Spring Boot", "Docker & AWS Cloud"].map((skill, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.5 }}
                    >
                      <div className="w-3 h-[1px] bg-gray-500 mr-3"></div>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </FadeInSection>

        {/* Tools & Soft Skills - Redesigned with better layout */}
        <FadeInSection delay={0.4}>
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border border-gray-800 hover:border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl tracking-wider text-white mb-6 flex items-center">
                <span className="inline-block w-6 h-[1px] bg-orange-500 mr-3"></span>
                TOOLS & TECH
              </h3>
              <ul className="text-base sm:text-lg text-gray-300 space-y-3">
                {["Git & GitHub, Jira, Notion", "REST APIs, OpenAI API, AWS (DynamoDB, S3, Lambda)"].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.7 }}
                  >
                    <span className="w-3 h-[1px] bg-gray-500 mt-[0.7em] mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="border border-gray-800 hover:border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl tracking-wider text-white mb-6 flex items-center">
                <span className="inline-block w-6 h-[1px] bg-orange-500 mr-3"></span>
                SOFT SKILLS
              </h3>
              <ul className="text-base sm:text-lg text-gray-300 space-y-3">
                {["Strategic Problem Solving", "Effective Teamwork & Leadership", "Adaptability & Clear Communication"].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.7 }}
                  >
                    <span className="w-3 h-[1px] bg-gray-500 mt-[0.7em] mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </FadeInSection>

        {/* Education - Enhanced with better hover effects */}
        <FadeInSection delay={0.5}>
          <div className="mt-20">
            <h3 className="text-xl sm:text-2xl md:text-3xl tracking-wider text-white mb-6 flex items-center">
              <span className="inline-block w-8 h-[1px] bg-orange-500 mr-4"></span>
              EDUCATION
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="border border-gray-800 hover:border-gray-600 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              <h4 className="text-lg sm:text-xl md:text-2xl text-white mb-2">B.S. Computer Science</h4>
              <p className="text-base sm:text-lg text-gray-400 mb-4 flex items-center">
                <span className="inline-block w-2 h-2 border border-gray-600 transform rotate-45 mr-3"></span>
                Royal Melbourne Institute of Technology (RMIT) • Melbourne, Australia
              </p>
              <p className="text-sm sm:text-base text-gray-400 ml-5">
                Graduated Dec 2024 with a focus on Software Engineering, Machine Learning, and scalable system design.
              </p>
            </motion.div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default About;
