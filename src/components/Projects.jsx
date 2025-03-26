import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import FuzzyText from '../formats/FuzzyText';

/**
 * Custom hook to detect small screens (less than 640px).
 */
function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSmallScreen;
}

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);

  // Detect if screen is small
  const isSmallScreen = useIsSmallScreen();

  const projects = [
    {
      id: 1,
      title: "Super-Price",
      category: "Full Stack Application",
      description:
        "Designed a full-stack price-matching app that cut comparison time by 50%. Developed web scrapers and migrated store data to an SQLite database on AWS, enabling 10k real-time comparisons daily. Integrated performance dashboards to boost data accuracy by 25% for 50 users.",
      technologies: [
        "React",
        "TypeScript",
        "Java",
        "Spring Boot",
        "SQLite",
        "AWS",
        "Web Scraping",
        "Performance Dashboards"
      ],
      image: "https://via.placeholder.com/1200x800/1a1a1a/ff5000",
      link: "https://github.com/SumethD/FullStack-WebApp"
    },
    {
      id: 2,
      title: "Hal-Bot",
      category: "AI Chatbot",
      description:
        "Built an AI chatbot that cut response times by 40% for CS student queries using AWS Lambda and AWS Lex. Integrated a React/TypeScript front-end and utilized RMIT JSON data to enhance search efficiency.",
      technologies: [
        "AWS Lambda",
        "AWS Lex",
        "React",
        "TypeScript",
        "JSON Handling",
        "AWS DynamoDB",
        "AWS S3",
        "AWS CloudWatch"
        
      ],
      image: "https://via.placeholder.com/1200x800/1a1a1a/00a8ff",
      link: "https://github.com/SumethD/halbot"
    },
    {
      id: 3,
      title: "Savorly-AI",
      category: "Full Stack Application",
      description:
        "Developed a dynamic recipe search engine using the Edamam API, serving 10+ users monthly. Designed an AI chat assistant with OpenAI GPT-4 to handle cooking queries, built a Video-to-Recipe tool that transcribed 50 YouTube links daily, and created a shopping list generator to merge ingredients and serve over 50 recipes.",
      technologies: [
        "React",
        "Edamam API",
        "OpenAI GPT-4",
        "YouTube API",
        "API Integration",
        "Dynamic Content Generation",
        "Supabase Database"
      ],
      image: "https://via.placeholder.com/1200x800/1a1a1a/ff00f7",
      link: "https://github.com/SumethD/AI-Powered-Recipe-Recommender"
    }
  ];

  const handleNext = useCallback(() => {
    if (!isAnimating) {
      setDirection(1);
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [isAnimating, projects.length]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  // Reset animation after half a second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-rotate slides unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered, currentIndex, isAnimating, handleNext]);

  // Custom scrollbar for descriptions
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.5);
      }
    `;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Page container animation
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
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

  // Simplified project animation for mobile - removed animations on small screens
  const projectVariants = {
    enter: (direction) => ({
      x: !isSmallScreen ? (direction === 'right' ? 300 : -300) : 0,
      opacity: 0,
      scale: !isSmallScreen ? 0.9 : 1
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: !isSmallScreen ? 0.7 : 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
    exit: (direction) => ({
      x: !isSmallScreen ? (direction === 'right' ? -300 : 300) : 0,
      opacity: 0,
      scale: !isSmallScreen ? 0.9 : 1,
      transition: { 
        duration: !isSmallScreen ? 0.7 : 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }
    })
  };

  // Toggle description expansion for mobile
  const toggleDescription = (e) => {
    if (isSmallScreen) {
      e.stopPropagation();
      setExpandedDescription(!expandedDescription);
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
      
      {/* Title Section - remains unchanged */}
      <motion.div 
        className="flex justify-center sm:justify-start sm:ml-[20%] md:ml-[25%] mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1 
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] font-light flex items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FuzzyText 
            fontSize="3rem" 
            baseIntensity={0.2} 
            hoverIntensity={0.5}
            color="#ff6b00"
          >
            PROJECTS
          </FuzzyText>
          <span className="ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm md:text-base tracking-wider">02</span>
        </motion.h1>
      </motion.div>

      {/* Project counter row with conditional layout - improved spacing for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-6xl mx-auto px-2 sm:px-8 mb-6 sm:mb-10"
      >
        <div className={isSmallScreen ? "flex flex-col items-center gap-2" : "flex justify-between items-center"}>
          <div className="text-xs text-gray-500 tracking-widest flex items-center">
            <span className="mr-1 sm:mr-2">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="ml-1 sm:ml-2">
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>
          <div className="text-xs tracking-widest uppercase text-gray-400">
            {projects[currentIndex].category}
          </div>
        </div>
      </motion.div>

      {/* Progress bar - adjusted positioning for mobile */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-12 sm:bottom-[-20px] w-[120px] sm:w-[200px] h-[3px] bg-gray-800 mx-auto">
        <div
          className="absolute top-0 left-0 h-full bg-white transition-all duration-700 ease-out"
          style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
        ></div>
      </div>

      {/* Carousel container */}
      <div
        className="w-full max-w-6xl mx-auto relative px-2 sm:px-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-[50vh] sm:h-[70vh] min-h-[350px] sm:min-h-[550px] overflow-hidden border border-gray-800"
        >
          {projects.map(
            (project, index) =>
              index === currentIndex && (
                <motion.div
                  key={project.id}
                  custom={direction}
                  variants={projectVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 z-20"></div>
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center z-10 transition-all duration-700"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: isHovered ? '105%' : '100%'
                    }}
                  ></div>

                  {/* Title overlay container - Improved for mobile readability */}
                  <div className="absolute inset-x-0 top-[6%] sm:top-[15%] flex justify-center z-30 px-2 sm:px-4">
                    <div className={`text-center ${!isSmallScreen ? "transition-all duration-700 hover:scale-105" : ""} px-4`}>
                      {isSmallScreen ? (
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-light tracking-wider">
                          <FuzzyText
                            fontSize="2rem"
                            baseIntensity={0.2}
                            hoverIntensity={0.6}
                            enableHover={true}
                          >
                            {project.title}
                          </FuzzyText>
                        </h1>
                      ) : (
                        <FuzzyText
                          fontSize="3rem"
                          baseIntensity={0.3}
                          hoverIntensity={0.6}
                          enableHover={true}
                        >
                          {project.title}
                        </FuzzyText>
                      )}
                      <div className={`h-[2px] ${isSmallScreen ? "w-[60px]" : "w-[80px] sm:w-[100px]"} bg-white mx-auto mt-2 sm:mt-4 relative overflow-hidden`}>
                        {!isSmallScreen && (
                          <div className="absolute top-0 left-0 w-full h-full bg-white animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project details container - Improved for mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8 z-30">
                    <div className="mx-auto max-w-md sm:max-w-2xl md:max-w-3xl">
                      {/* Mobile-optimized header layout with better spacing */}
                      <div className="flex flex-col space-y-1 mb-2 sm:mb-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                        {/* Project type and concept - Simplified on mobile */}
                        <div className="text-center sm:text-left">
                          {isSmallScreen ? (
                            <div className="text-sm tracking-wider text-orange-500/70 font-light">
                              {project.category}
                            </div>
                          ) : (
                            <>
                              <div className="text-sm tracking-[0.2em] text-orange-500/70 font-light mb-2">
                                {project.category}
                              </div>
                              <div className="text-xs tracking-[0.15em] text-gray-400">
                                <span className="border-b border-gray-700 pb-1">
                                  {project.id.toString().padStart(2, '0')} CONCEPT
                                </span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* View project button - Simplified on mobile */}
                        <div className="flex justify-center sm:justify-end">
                          <a
                            href={project.link}
                            className={`group relative inline-flex items-center ${
                              isSmallScreen 
                                ? "px-4 py-1 text-sm tracking-wider bg-black/50" 
                                : "px-6 py-2 text-sm tracking-[0.2em] bg-black/30 backdrop-blur-sm"
                            } overflow-hidden border border-gray-700 hover:border-gray-500 transition-all duration-300`}
                          >
                            <span className="relative z-10">VIEW PROJECT</span>
                            {!isSmallScreen && (
                              <div className="absolute inset-0 bg-orange-500/10 transform origin-left scale-x-0 
                              group-hover:scale-x-100 transition-transform duration-300"></div>
                            )}
                          </a>
                        </div>
                      </div>

                      {/* Separator line - Only on larger screens */}
                      {!isSmallScreen && (
                        <div className="h-[1px] w-full bg-gradient-to-r from-gray-700 via-gray-700/50 to-transparent mb-4"></div>
                      )}

                      {/* Description - Enhanced for mobile readability with expand/collapse */}
                      <div className="mb-3 sm:mb-6 relative">
                        {isSmallScreen ? (
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={toggleDescription}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                toggleDescription(e);
                              }
                            }}
                            className={`${
                              expandedDescription
                                ? "text-sm leading-relaxed max-h-[50vh] overflow-y-auto"
                                : "text-sm leading-relaxed max-h-[22vh] overflow-hidden"
                            } text-gray-300 pr-1 custom-scrollbar
                              text-center sm:text-left cursor-pointer outline-none focus:ring-1 focus:ring-orange-500/50 p-1`}
                          >
                            {expandedDescription
                              ? project.description
                              : project.description.length > 150 
                                ? project.description.substring(0, 150) + "..."
                                : project.description
                            }
                          </div>
                        ) : (
                          <p className="text-sm sm:text-base sm:leading-relaxed max-h-[25vh] text-gray-300 pr-1 custom-scrollbar text-center sm:text-left">
                            {project.description}
                          </p>
                        )}
                        
                        {/* Expand/Collapse button for mobile */}
                        {isSmallScreen && project.description.length > 150 && (
                          <motion.button
                            initial={{ opacity: 0.7 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] uppercase tracking-wider text-orange-500/80 hover:text-orange-500 
                            transition-colors mt-1 mb-2 mx-auto block"
                            onClick={toggleDescription}
                          >
                            {expandedDescription ? "Show Less" : "Read More"}
                          </motion.button>
                        )}
                      </div>

                      {/* Technologies list - Adjust positioning based on description state */}
                      <div className={`flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-2 ${
                        expandedDescription ? "mb-6" : "mb-4"
                      } sm:mb-0`}>
                        {project.technologies.slice(0, isSmallScreen ? 5 : project.technologies.length).map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={isSmallScreen ? { opacity: 1 } : { opacity: 0, y: 10 }}
                            animate={isSmallScreen ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={isSmallScreen ? {} : { delay: i * 0.1 }}
                            className={`${
                              isSmallScreen 
                                ? "text-xs px-2 py-1 bg-black/70" 
                                : "text-xs px-3 py-1.5 bg-black/50 backdrop-blur-sm"
                              } border border-gray-700 text-gray-300 
                              transition-all duration-300 hover:border-orange-500/30
                              hover:bg-black/70 sm:text-sm`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {isSmallScreen && project.technologies.length > 5 && (
                          <span className="text-xs px-2 py-1 bg-black/70 border border-gray-700 text-gray-300">
                            +{project.technologies.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile navigation - Repositioned based on description state */}
                  <div className={`sm:hidden absolute ${
                    expandedDescription ? "bottom-[-52px]" : "bottom-[-48px]"
                  } left-0 right-0 flex justify-center space-x-6 z-40`}>
                    <button
                      className="w-9 h-9 flex items-center justify-center 
                      border border-gray-700 bg-black/70
                      transition-all duration-300"
                      onClick={handlePrev}
                      aria-label="Previous project"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Simplified dots for mobile */}
                    <div className="flex items-center space-x-2">
                      {projects.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-orange-500' : 'bg-gray-700'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <button
                      className="w-9 h-9 flex items-center justify-center 
                      border border-gray-700 bg-black/70
                      transition-all duration-300"
                      onClick={handleNext}
                      aria-label="Next project"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )
          )}
        </motion.div>

        {/* Navigation controls (dots) - Repositioned for better spacing on mobile */}
        <div className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 z-40 flex justify-center space-x-3 sm:space-x-4">
          {!isSmallScreen && projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 border border-gray-700 flex items-center justify-center transition-all duration-300 ${
                index === currentIndex ? 'border-white' : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-transparent'
                }`}
              ></span>
            </button>
          ))}
        </div>

        {/* Navigation arrows - Positioned below content on mobile with better spacing */}
        <div className="sm:hidden flex justify-center space-x-4 mt-16">
          <button
            className="w-9 h-9 flex items-center justify-center border border-gray-700 bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:border-gray-400"
            onClick={handlePrev}
            aria-label="Previous project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="w-9 h-9 flex items-center justify-center border border-gray-700 bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:border-gray-400"
            onClick={handleNext}
            aria-label="Next project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Side navigation arrows - Only shown on medium screens and up */}
        <button
          className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-14 sm:h-14 items-center justify-center border border-gray-700 bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:border-gray-400"
          onClick={handlePrev}
          aria-label="Previous project"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-14 sm:h-14 items-center justify-center border border-gray-700 bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:border-gray-400"
          onClick={handleNext}
          aria-label="Next project"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.section>
  );
};

export default Projects;
