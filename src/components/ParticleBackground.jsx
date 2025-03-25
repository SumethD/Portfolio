import React, { memo, useCallback, useEffect, useState } from 'react';
import Particles from './Particles';

const ParticleBackground = memo(() => {
  // State to track viewport dimensions
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust particle count based on screen size for performance
  const getParticleCount = () => {
    if (dimensions.width <= 768) return 100; // Mobile
    if (dimensions.width <= 1200) return 150; // Tablet
    return 200; // Desktop
  };

  // Memoize particle settings to prevent recreating on each render
  const particleSettings = {
    particleCount: getParticleCount(),
    particleSpread: 2,
    speed: 0.12,
    particleColors: ['#ffffff'],
    moveParticlesOnHover: true,
    particleHoverFactor: 2,
    alphaParticles: true
  };

  // Enhanced style object to ensure full coverage
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1, // Above default background, below content
    pointerEvents: 'none', // Allow clicking through to content
    willChange: 'transform', // Optimize for animations
    contain: 'strict', // Improve performance by containing repaints
    overflow: 'hidden' // Prevent scrollbars
  };

  return (
    <div style={backgroundStyle}>
      <Particles {...particleSettings} />
    </div>
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground; 