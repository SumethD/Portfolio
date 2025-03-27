import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FuzzyText from '../formats/FuzzyText';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const experienceRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0.3, 0.5, 0.7]
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
      role: "Software Developer Intern",
      company: "IFFA Windsor",
      period: "Mar 2024 - Sep 2024",
      description: "Led PHP-to-React migration, improving performance by 60% and user engagement by 35%. Built interactive forms and enhanced real-time updates.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "PHP"]
    },
    {
      id: 2,
      role: "Production & R&D Support",
      company: "Leica Biosystems",
      period: "Nov 2022 - Present",
      description: "Developed Python Kanban app for inventory tracking. Worked on R&D projects and cancer-staining instruments, achieving 98.3% accuracy.",
      techStack: ["Python", "R&D", "Kanban", "Quality Control"]
    }
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Python", level: 75 },
    { name: "Node.js", level: 75 },
    { name: "Tailwind CSS", level: 85 }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4 }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  const skillBarVariants = {
    initial: { width: 0 },
    animate: (level) => ({
      width: `${level}%`,
      transition: { duration: 1, ease: "easeOut" }
    })
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-24 pb-16 px-4 sm:px-8 relative overflow-hidden z-[3] text-white"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Simplified Title */}
        <motion.div
          className="flex items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ duration: 0.8 }}
            className="h-[1px] bg-orange-500/50 mr-4"
          />
          <h1 className="text-3xl sm:text-4xl tracking-wider font-light">
            <FuzzyText fontSize="2.5rem" baseIntensity={0.2} hoverIntensity={0.5}>
              EXPERIENCE
            </FuzzyText>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Simplified Timeline */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8"
          >
            <div className="relative pl-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  custom={index}
                  variants={timelineVariants}
                  className="mb-8 relative group"
                  ref={el => experienceRefs.current[index] = el}
                >
                  {/* Timeline indicator */}
                  <div className="absolute left-[-16px] top-0 h-full">
                    <div className={`w-[2px] h-full ${
                      activeIndex === index ? 'bg-orange-500' : 'bg-gray-700'
                    } transition-colors duration-500`} />
                    <div className={`absolute top-0 left-[-4px] w-[8px] h-[8px] ${
                      activeIndex === index ? 'bg-orange-500' : 'bg-gray-600'
                    } transition-colors duration-500 transform rotate-45`} />
                  </div>
                  
                  {/* Experience card */}
                  <div 
                    className={`border border-gray-800 bg-black/30 backdrop-blur-sm p-6 
                    transition-all duration-300
                    ${activeIndex === index ? 'border-orange-500/30' : ''}`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-light mb-1">{exp.role}</h3>
                        <p className="text-gray-400">{exp.company}</p>
                      </div>
                      <div className="text-gray-400 mt-2 sm:mt-0 text-sm">
                        {exp.period}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 text-sm">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-2 py-1 bg-black/50 border border-gray-700 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Simplified Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="border border-gray-800 bg-black/30 backdrop-blur-sm p-6">
              <h3 className="text-lg tracking-wider text-white mb-6">
                SKILLS
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white">{skill.name}</span>
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] bg-gray-800/50 overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-orange-500"
                        variants={skillBarVariants}
                        custom={skill.level}
                        initial="initial"
                        animate="animate"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
