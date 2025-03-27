import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FuzzyText from '../formats/FuzzyText';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const experienceRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0.3, 0.5, 0.7] // Multiple thresholds for smoother transitions
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = experienceRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          setActiveIndex(index);
        }
      });
    }, options);

    experienceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      id: 1,
      role: "Software Developer Intern (Front-End)",
      company: "IFFA Windsor",
      period: "Mar 2024 - Sep 2024",
      description:
        "Led the charge on a PHP-to-React migration using Tailwind and TypeScript—performance shot up by 60%, and users actually stuck around (35% boost in engagement!). Built a slick, interactive form that over 1,500 people used, which ended up bumping event attendance by 25% in November 2024. Also tweaked real-time film and talent updates in the arts space, which gave us a nice 40% jump in page views. Honestly, it was one of those projects where everything just clicked—clean code, good vibes, and real impact.",
      responsibilities: [
        "Migrated legacy PHP code to React with Tailwind/TypeScript.",
        "Developed an interactive form for 1,500+ users.",
        "Enhanced real-time film/talent updates, increasing page views by 40%."
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS", "PHP", "MySQL"]
    },
    {
      id: 2,
      role: "Production & R&D Support Specialist",
      company: "Leica Biosystems",
      period: "Nov 2022 - Present",
      description:
        "Pitched and built a Python-based Kanban web app that digitized 100% of the inventory tracking—we're talking sticky notes to screens level-up. Got to brief the VP too, and while the full demo and rollout plan are good to go, I haven't officially presented it yet (still chilling in my back pocket). Most of my time was spent in the Peloris cell (huge shoutout to the crew there) working on fun R&D projects—tested new staining methods for slide labeling and helped build sub-components for cancer-staining instruments worth $100K–$200K. Hit 98.3% accuracy on some builds, which was a win. Not exactly SWE or trading, but the team vibe was unreal—super supportive leader, great teammates, and an awesome environment to grow and contribute.",
      responsibilities: [
        "Built a Python Kanban web app that fully digitized inventory tracking.",
        "Briefed the VP and prepared a demo and rollout plan (yet to be officially presented).",
        "Tested new staining methods in R&D sprints for slide labeling innovations.",
        "Worked in the Peloris cell building sub-components for $100K–$200K cancer-staining instruments.",
        "Achieved 98.3% accuracy on component builds and quality control tasks."
      ],
      techStack: ["Python", "R&D", "Kanban", "Process Optimization", "Quality Control"]
    }
    
    
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Python", level: 75 },
    { name: "Java", level: 70 },
    { name: "AWS", level: 65 },
    { name: "Node.js", level: 75 },
    { name: "Tailwind CSS", level: 85 }
  ];

  const additionalExpertise = [
    {
      title: "Technical Skills",
      content: "Languages: Python, JavaScript, Java, SQL. Frameworks & Libraries: Node.js, Flask, React.js, Spring Boot, TypeScript.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Developer Tools",
      content: "Tools: Git, Docker, AWS (DynamoDB, S3, Lambda), REST APIs, OpenAI API.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    },
    {
      title: "Transferable Skills",
      content: "Soft Skills: Problem-solving, teamwork, adaptability, communication.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  // Enhanced animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
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

  const skillBarVariants = {
    initial: { width: 0 },
    animate: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden z-[3] text-white"
    >
      {/* Background decorative elements - Hide on small screens */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-40 right-20 w-96 h-96 rounded-full border border-orange-500/20 hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-40 left-20 w-64 h-64 rounded-full border border-orange-500/20 hidden lg:block"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Enhanced Title Section - Preserved */}
        <motion.div
          className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-orange-500/50 to-transparent mr-0 sm:mr-8 mb-4 sm:mb-0"
          />
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] font-light flex items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FuzzyText fontSize="3rem" baseIntensity={0.2} hoverIntensity={0.5}>
              EXPERIENCE
            </FuzzyText>
            <span className="ml-3 text-orange-500/70 text-base tracking-wider">03</span>
          </motion.h1>
        </motion.div>

        {/* Responsive grid with improved spacing for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Enhanced Timeline - Improved for mobile */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <div className="relative pl-6 sm:pl-8 md:pl-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  custom={index}
                  variants={timelineVariants}
                  className="mb-12 sm:mb-16 relative group"
                  ref={el => experienceRefs.current[index] = el}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => {
                    const element = experienceRefs.current[index];
                    if (element) {
                      const rect = element.getBoundingClientRect();
                      const isVisible = rect.top >= window.innerHeight * 0.2 &&
                                      rect.bottom <= window.innerHeight * 0.8;
                      if (!isVisible) setActiveIndex(null);
                    }
                  }}
                >
                  {/* Enhanced Timeline indicator - Adjusted for mobile */}
                  <motion.div 
                    className="absolute left-[-16px] sm:left-[-26px] top-0 h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className={`w-[2px] sm:w-[3px] h-full ${
                      activeIndex === index 
                        ? 'bg-gradient-to-b from-orange-500 via-orange-400 to-orange-500'
                        : 'bg-gray-700'
                    } transition-all duration-700 ease-in-out`} />
                    <div className={`absolute top-0 left-[-4px] w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] ${
                      activeIndex === index 
                        ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                        : 'bg-gray-600'
                    } transition-all duration-700 ease-in-out transform rotate-45`} />
                  </motion.div>
                  
                  {/* Enhanced Experience card - Optimized for mobile */}
                  <div 
                    className={`border border-gray-800 group-hover:border-gray-600 
                    bg-black bg-opacity-30 backdrop-blur-sm p-4 sm:p-6 md:p-8 
                    transition-all duration-500 relative
                    ${activeIndex === index 
                      ? 'border-orange-500/30 shadow-[0_0_30px_rgba(0,0,0,0.2)] translate-y-[-5px]' 
                      : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 sm:mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-3xl font-light mb-2">{exp.role}</h3>
                        <p className="text-gray-400 flex items-center text-sm sm:text-base sm:text-lg">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-gray-400 mt-2 md:mt-0 tracking-wider px-3 sm:px-4 py-1 sm:py-2 border-l border-gray-800 text-xs sm:text-sm">
                        {exp.period}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 sm:mb-8 text-sm sm:text-base sm:text-lg leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {exp.description}
                    </p>
                    
                    <div className="mb-4 sm:mb-8">
                      <h4 className="text-xs sm:text-sm sm:text-base text-white uppercase tracking-wider mb-2 sm:mb-4 flex items-center">
                        <span className="inline-block w-4 sm:w-6 h-[1px] bg-orange-500 mr-2 sm:mr-3"></span>
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2 sm:space-y-3 pl-2 sm:pl-3">
                        {exp.responsibilities.map((resp, i) => (
                          <motion.li 
                            key={i} 
                            className="relative pl-4 sm:pl-5 text-gray-300 text-xs sm:text-sm sm:text-base"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="absolute left-0 top-[8px] w-2 sm:w-3 h-[1px] bg-gray-500"></span>
                            {resp}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xs sm:text-sm sm:text-base text-white uppercase tracking-wider mb-2 sm:mb-4 flex items-center">
                        <span className="inline-block w-4 sm:w-6 h-[1px] bg-orange-500 mr-2 sm:mr-3"></span>
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {exp.techStack.map((tech, i) => (
                          <motion.span 
                            key={i} 
                            className="text-[10px] sm:text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 bg-black bg-opacity-50 border border-gray-700 text-gray-300 hover:border-gray-500 transition-all duration-300"
                            whileHover={{ y: -2 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 + 0.3 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Enhanced Skills & Expertise Section - Optimized for mobile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-6 sm:space-y-8"
          >
            {/* Enhanced Skills section - More compact on mobile */}
            <motion.div
              variants={childVariants}
              className="border border-gray-800 hover:border-gray-700 
              bg-black bg-opacity-30 backdrop-blur-sm p-4 sm:p-6 md:p-8 
              transition-all duration-300 relative overflow-hidden"
            >
              <h3 className="text-lg sm:text-xl sm:text-2xl tracking-wider text-white mb-4 sm:mb-8 flex items-center">
                <span className="inline-block w-6 sm:w-8 h-[1px] bg-gradient-to-r from-orange-500 to-transparent mr-3 sm:mr-4" />
                TECHNICAL PROFICIENCY
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                {skills.map((skill, i) => (
                  <motion.div 
                    key={i}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(i)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <span className={`text-sm sm:text-base sm:text-lg transition-colors duration-300
                        ${hoveredSkill === i ? 'text-orange-500' : 'text-white'}`}>
                        {skill.name}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] sm:h-[3px] bg-gray-800/50 overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                        variants={skillBarVariants}
                        custom={skill.level}
                        initial="initial"
                        animate="animate"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced expertise cards - More compact on mobile */}
            <div className="space-y-4 sm:space-y-6">
              {additionalExpertise.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 + 0.8 }}
                  className="border border-gray-800 hover:border-orange-500/30
                  bg-black bg-opacity-30 backdrop-blur-sm p-4 sm:p-6
                  transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]
                  hover:translate-y-[-5px] relative overflow-hidden group"
                >
                  <div className="flex items-start mb-3 sm:mb-4">
                    <div className="text-orange-500/70 mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h4 className="text-base sm:text-lg sm:text-xl text-white group-hover:text-orange-500/70 transition-colors duration-300">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm sm:text-base pl-10 sm:pl-12">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Subtle glow effect on hover */}
      <style>
        {`
          .experience-card {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          .experience-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .experience-card:hover::before {
            opacity: 1;
          }
        `}
      </style>
    </motion.section>
  );
};

export default Experience;
