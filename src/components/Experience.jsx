import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FuzzyText from '../formats/FuzzyText';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const experiences = [
    {
      id: 1,
      role: "Software Developer Intern (Front-End)",
      company: "IFFA Windsor",
      period: "Mar 2024 - Sep 2024",
      description:
        "Led a PHP-to-React migration using Tailwind/TypeScript, boosting performance by 60% and increasing user engagement by 35%. Developed an interactive form for 1,500+ users that drove a 25% spike in event attendance for November 2024, and enhanced real-time film/talent updates to boost page views by 40% in the arts sector.",
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
        "Pitched and implemented a Python-based Kanban webapp that digitized 100% of inventory tracking, and briefed the VP. Tested new staining methods in R&D sprints that contributed to 3 market-ready tech innovations and built sub-components for cancer-staining instruments valued between $100K-$200K, achieving 98.3% accuracy.",
      responsibilities: [
        "Pitched and implemented a Python Kanban webapp for inventory tracking.",
        "Tested new staining methods during R&D sprints, contributing to tech innovations.",
        "Built sub-components for high-value cancer-staining instruments with 98.3% accuracy."
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

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden z-[3] text-white"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Title Section */}
        <motion.div
          className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-12 sm:mb-16"
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
          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] font-light flex items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FuzzyText fontSize="clamp(2.5rem, 8vw, 4rem)" baseIntensity={0.2} hoverIntensity={0.5}>
              EXPERIENCE
            </FuzzyText>
            <span className="ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm md:text-base tracking-wider">03</span>
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side - Timeline */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {/* Removed outer left border and decorative absolute line */}
            <div className="relative pl-8 md:pl-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  custom={index}
                  variants={timelineVariants}
                  className="mb-16 relative"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Replacing dots with a more elegant timeline indicator */}
                  <motion.div 
                    className="absolute left-[-26px] top-0 h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className={`w-[3px] h-full ${activeIndex === index ? 'bg-orange-500' : 'bg-gray-700'} transition-colors duration-300`}></div>
                    <div className={`absolute top-0 left-[-3px] w-[9px] h-[9px] ${activeIndex === index ? 'bg-orange-500' : 'bg-gray-600'} transition-colors duration-300 transform rotate-45`}></div>
                  </motion.div>
                  
                  {/* Experience card - enhanced design */}
                  <div 
                    className={`border border-gray-800 hover:border-gray-600 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 ${
                      activeIndex === index ? 'border-gray-500 shadow-lg transform translate-y-[-5px]' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-2">{exp.role}</h3>
                        <p className="text-gray-400 flex items-center text-base sm:text-lg">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-gray-400 mt-2 md:mt-0 tracking-wider px-4 py-2 border-l border-gray-800 text-sm sm:text-base">
                        {exp.period}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-8 text-base sm:text-lg leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="text-sm sm:text-base text-white uppercase tracking-wider mb-4 flex items-center">
                        <span className="inline-block w-6 h-[1px] bg-orange-500 mr-3"></span>
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3 pl-3">
                        {exp.responsibilities.map((resp, i) => (
                          <motion.li 
                            key={i} 
                            className="relative pl-5 text-gray-300 text-sm sm:text-base"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="absolute left-0 top-[10px] w-3 h-[1px] bg-gray-500"></span>
                            {resp}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm sm:text-base text-white uppercase tracking-wider mb-4 flex items-center">
                        <span className="inline-block w-6 h-[1px] bg-orange-500 mr-3"></span>
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech, i) => (
                          <motion.span 
                            key={i} 
                            className="text-xs sm:text-sm px-3 py-1 bg-black bg-opacity-50 border border-gray-700 text-gray-300 hover:border-gray-500 transition-all duration-300"
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
          
          {/* Right side - Skills & Expertise */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            {/* Skills section */}
            <motion.div
              variants={childVariants}
              initial="hidden"
              animate="visible"
              className="mb-12 border border-gray-800 hover:border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 transition-all duration-300"
            >
              <h3 className="text-xl sm:text-2xl tracking-wider text-white mb-8 flex items-center">
                <span className="inline-block w-8 h-[1px] bg-orange-500 mr-4"></span>
                TECHNICAL PROFICIENCY
              </h3>
              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <motion.div 
                    key={i} 
                    className="relative"
                    custom={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base sm:text-lg text-white">{skill.name}</span>
                      <span className="text-xs sm:text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-[3px] bg-gray-800 overflow-hidden">
                      <motion.div
                        className="h-full bg-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 + 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional expertise cards */}
            <div className="space-y-6">
              {additionalExpertise.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 + 0.8 }}
                  className="border border-gray-800 hover:border-gray-700 bg-black bg-opacity-30 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
                >
                  <div className="flex items-start mb-4">
                    <div className="text-orange-500 mr-4">
                      {item.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl text-white">{item.title}</h4>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base pl-12">
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
