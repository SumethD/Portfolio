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

/**
 * Custom hook to detect iPhone SE size specifically (375x667).
 */
function useIsIPhoneSE() {
  const [isIPhoneSE, setIsIPhoneSE] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsIPhoneSE(
        window.innerWidth === 375 || 
        (window.innerWidth >= 370 && window.innerWidth <= 380 && window.innerHeight >= 660 && window.innerHeight <= 670)
      );
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isIPhoneSE;
}

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Detect if screen is small or specifically iPhone SE
  const isSmallScreen = useIsSmallScreen();
  const isIPhoneSE = useIsIPhoneSE();

  const projects = [
    {
      id: 1,
      title: "Super-Price",
      category: "UNI Project • Full Stack Application",
      description:
        "Did a group project at RMIT where we built a price-matching app that made comparing stuff way quicker—cut the time by half. We used Java with Spring Boot for the backend, and built some web scrapers in Java to pull in store data, which we dumped into an SQLite database on AWS. Front end was React, and we threw in some dashboards to make the data more accurate—ended up improving it by around 25% for 10 to 100 users. It could do about 1000 real-time comparisons a day, which was pretty sick. Can't run it now 'cause of AWS limits, but it was a fun build and a good team vibe all around.",
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
      category: "UNI Project • AI Chatbot",
      description:
        "Worked on a group project at RMIT where we built an AI chatbot that cut down student query response times by 40%. We used AWS Lex to handle the convo side of things, Lambda for the backend logic, DynamoDB for storing stuff, and S3 for all our data. CloudWatch helped us keep everything running smooth. The front end was built with React and TypeScript (TSX), and we used RMIT's JSON data to make searching super fast. It was all supervised by one of our profs, and honestly, it was a fun project—learned a ton and had a good time building it with the team.",
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
      category: "Weekend Project • Full Stack Application",
      description:
        "Built a recipe search engine over a weekend just for fun—honestly got the idea while sitting on the toilet. Used the Edamam API to let people search for recipes (about 10+ users a month), and added a GPT-4-powered AI assistant to help answer random cooking questions. Also made a Video-to-Recipe tool that takes YouTube links and turns them into recipes—around 50 a day—and a shopping list generator that merges ingredients from 50+ recipes. Just messing around, learning new stuff like API integrations and playing with Cursor AI. Haven't deployed it yet, but planning to soon. Super fun little side project I really enjoyed building.",
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
    },
    {
      id: 4,
      title: "Crypto Arbitrage Demo",
      category: "Weekend Project • Algorithmic Trading Demo",
      description:
        "I whipped up a quick weekend project—a script to compare spot trading prices across several exchanges (Kraken, Bitfinex, Bybit, OKX, Huobi) just to see where the best profit ratio was hiding. It's mostly a demo—real arbitrage needs lightning-fast servers that I simply don't have at home. But hey, it was a blast tinkering with exchange APIs and crunching real-time data. Maybe one day I'll finish the script to actually place trades!",
      technologies: [
        "Python",
        "Node.js",
        "Exchange APIs",
        "Real-Time Data Fetching",
        "Spot Trading",
        "API Integration",
        "Real-Time Data Processing"
      ],
      image: "https://via.placeholder.com/1200x800/1a1a1a/00a8ff",
      link: "https://github.com/SumethD/Crypto-Arbitrage"
    }
    ,
    {
      id: 5,
      title: "Vending Machine in C++",
      category: "UNI Project • Console Application",
      description:
        "I jumped into a group project at RMIT to build a vending machine simulator in C++—and had zero experience with the language! I had to learn pointers, memory management, and all the quirky details on the fly. I ended up carrying the team through a maze of bugs and pointer puzzles. It was a wild, crash-course ride into C++ fundamentals, but a super fun and rewarding adventure!",
      technologies: [
        "C++",
        "Pointers & Memory Management",
        "Console Simulation",
        "Team Collaboration",
        "Quick Learning",
        "Fast Adaptation"
      ],
      image: "https://via.placeholder.com/1200x800/1a1a1a/ff00f7",
      link: "https://github.com/SumethD/Vending-Machine"
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

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden z-[3] text-white"
    >
      
      {/* Title Section - adjusted specifically for iPhone SE */}
      <motion.div 
        className={`flex justify-center sm:justify-start sm:ml-[20%] md:ml-[25%] ${isIPhoneSE ? 'mb-6' : 'mb-12 sm:mb-16'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1 
          className={`${isIPhoneSE ? 'text-2xl' : 'text-3xl xs:text-4xl'} sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] font-light flex items-center`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FuzzyText 
            fontSize={isIPhoneSE ? "2rem" : "3rem"}
            baseIntensity={0.2} 
            hoverIntensity={0.5}
            color="#ff6b00"
          >
            PROJECTS
          </FuzzyText>
          <span className="ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm md:text-base tracking-wider">02</span>
        </motion.h1>
      </motion.div>

      {/* Project counter row - adjusted for iPhone SE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`w-full max-w-6xl mx-auto px-2 sm:px-8 ${isIPhoneSE ? 'mb-3' : 'mb-6 sm:mb-10'}`}
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

      {/* Progress bar - adjusted for iPhone SE */}
      <div className={`absolute left-1/2 -translate-x-1/2 ${isIPhoneSE ? 'bottom-6' : 'bottom-12'} sm:bottom-[-20px] w-[120px] sm:w-[200px] h-[3px] bg-gray-800 mx-auto`}>
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
          className={`relative ${isIPhoneSE ? 'h-[60vh]' : 'h-[65vh]'} sm:h-[70vh] min-h-[450px] sm:min-h-[550px] overflow-hidden border border-gray-800`}
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

                  {/* Title overlay container - Adjusted for iPhone SE with consistent spacing */}
                  <div className={`absolute inset-x-0 ${isIPhoneSE ? 'top-[5%]' : 'top-[6%]'} sm:top-[15%] flex justify-center z-30 px-2 sm:px-4`}>
                    <div className={`text-center ${!isSmallScreen ? "transition-all duration-700 hover:scale-105" : ""} px-4`}>
                      {isSmallScreen ? (
                        <h1 className={`${isIPhoneSE ? 'text-xl' : 'text-2xl xs:text-3xl'} sm:text-4xl font-light tracking-wider`}>
                          {project.title}
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

                  {/* Project details container - Standardized spacing for small screens */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 md:p-8 z-30">
                    <div className="mx-auto max-w-md sm:max-w-2xl md:max-w-3xl">
                      {/* Mobile header layout - Standardized for all small screens */}
                      <div className={`flex flex-col ${isSmallScreen ? 'space-y-2 mb-3' : 'space-y-0 mb-4'} sm:flex-row sm:justify-between sm:items-center sm:space-y-0`}>
                        {/* Project type and concept - uniform styling for small screens */}
                        <div className="text-center sm:text-left">
                          {isSmallScreen ? (
                            <div className={`${isSmallScreen ? 'text-xs' : 'text-sm'} tracking-wider text-orange-500/70 font-light`}>
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

                        {/* View project button - Standardized sizing across all small screens */}
                        <div className="flex justify-center sm:justify-end mt-1 sm:mt-0">
                          <a
                            href={project.link}
                            className={`group relative inline-flex items-center ${
                              isSmallScreen
                                ? "px-4 py-1 text-xs tracking-wider bg-black/50" 
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

                      {/* Description - Consistent spacing and height */}
                      <div className="mb-4 sm:mb-6 relative">
                        {isSmallScreen ? (
                          <div 
                            className={`text-gray-300 pr-1 text-center sm:text-left p-2 
                              ${isSmallScreen ? "text-md" : "text-md"}
                              leading-relaxed bg-black/60 rounded overflow-y-auto 
                              ${isIPhoneSE ? "max-h-[22vh]" : "max-h-[25vh]"}`}
                          >
                            {project.description}
                          </div>
                        ) : (
                          <p className="text-sm sm:text-base sm:leading-relaxed text-gray-300 pr-1 custom-scrollbar text-center sm:text-left max-h-[25vh] overflow-y-auto">
                            {project.description}
                          </p>
                        )}
                      </div>

                      {/* Technologies list - Consistent styling and spacing */}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-2 mb-4 sm:mb-0 mt-2">
                        {project.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={isSmallScreen ? { opacity: 1 } : { opacity: 0, y: 10 }}
                            animate={isSmallScreen ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={isSmallScreen ? {} : { delay: i * 0.1 }}
                            className={`${
                              isSmallScreen
                                ? "text-xs px-2 py-0.5 bg-black/70" 
                                : "text-xs px-3 py-1.5 bg-black/50 backdrop-blur-sm"
                            } border border-gray-700 text-gray-300 
                              transition-all duration-300 hover:border-orange-500/30
                              hover:bg-black/70 sm:text-sm`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile navigation - Standardized bottom positioning */}
                  <div className="sm:hidden absolute bottom-[-40px] left-0 right-0 flex justify-center space-x-6 z-40">
                    <button
                      className="w-8 h-8 flex items-center justify-center border border-gray-700 bg-black/70 transition-all duration-300"
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
                      className="w-8 h-8 flex items-center justify-center border border-gray-700 bg-black/70 transition-all duration-300"
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

        {/* Navigation controls (dots) */}
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

        {/* Navigation arrows - Adjusted for iPhone SE */}
        <div className={`sm:hidden flex justify-center space-x-4 ${isIPhoneSE ? 'mt-10' : 'mt-16'}`}>
          <button
            className={`${isIPhoneSE ? 'w-7 h-7' : 'w-9 h-9'} flex items-center justify-center border border-gray-700 bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:border-gray-400`}
            onClick={handlePrev}
            aria-label="Previous project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={isIPhoneSE ? "h-3 w-3" : "h-4 w-4"}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className={`${isIPhoneSE ? 'w-7 h-7' : 'w-9 h-9'} flex items-center justify-center border border-gray-700 bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:border-gray-400`}
            onClick={handleNext}
            aria-label="Next project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              className={isIPhoneSE ? "h-3 w-3" : "h-4 w-4"}
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
