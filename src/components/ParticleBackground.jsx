import { memo, useMemo, useEffect, useState } from 'react';
import Particles from './Particles';

const ParticleBackground = memo(() => {
  // State to track viewport width category to avoid unnecessary re-renders
  const [screenCategory, setScreenCategory] = useState(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    if (width <= 768) return 'mobile';
    if (width <= 1200) return 'tablet';
    return 'desktop';
  });

  // Update screen category on resize (debounced)
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        let newCategory;
        if (width <= 768) newCategory = 'mobile';
        else if (width <= 1200) newCategory = 'tablet';
        else newCategory = 'desktop';
        
        setScreenCategory(prev => prev !== newCategory ? newCategory : prev);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Memoize particle settings properly - only recreate when screen category changes
  const particleSettings = useMemo(() => {
    const particleCounts = {
      mobile: 100,   // Increased for better coverage
      tablet: 150,   // Increased for better coverage
      desktop: 200   // Full count for desktop
    };
    
    return {
      particleCount: particleCounts[screenCategory],
      particleSpread: 2.5,
      speed: 0.1,
      particleColors: ['#ffffff'],
      moveParticlesOnHover: true,
      particleHoverFactor: 1.5,
      alphaParticles: true
    };
  }, [screenCategory]);

  // The Particles component now handles its own fixed positioning
  // We just need a simple wrapper that doesn't interfere with the canvas
  return <Particles {...particleSettings} />;
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground; 