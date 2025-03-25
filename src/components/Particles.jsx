import React, { useEffect, useRef, memo } from 'react';

const Particles = memo(({
  particleCount = 150,
  particleSpread = 2,
  speed = 0.12,
  particleColors = ['#ffffff'],
  moveParticlesOnHover = true,
  particleHoverFactor = 2,
  alphaParticles = true
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const contextRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    contextRef.current = ctx;

    const handleResize = () => {
      // Get the device pixel ratio to support high-DPI displays
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas dimensions to match viewport with pixel ratio adjustment
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Scale the context to account for the device pixel ratio
      ctx.scale(dpr, dpr);
      
      // Set canvas display size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Reinitialize particles to fill the new viewport size 
      initializeParticles();
    };

    // Initialize particles function
    const initializeParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        size: Math.random() * particleSpread + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: alphaParticles ? Math.random() * 0.5 + 0.3 : 1
      }));
    };

    // Initial setup
    handleResize();

    // Throttled resize listener
    const debouncedResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);

    // Mouse move handler with throttling
    let mouseMoveTimeout;
    const handleMouseMove = (e) => {
      if (mouseMoveTimeout) return;
      mouseMoveTimeout = setTimeout(() => {
        mouseRef.current = {
          x: e.clientX,
          y: e.clientY
        };
        mouseMoveTimeout = null;
      }, 16); // ~60fps
    };

    if (moveParticlesOnHover) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation function
    const animate = () => {
      if (!contextRef.current || !canvas) return;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Handle boundaries
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        // Mouse interaction
        if (moveParticlesOnHover) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 100 * particleHoverFactor;
            particle.x -= Math.cos(angle) * force;
            particle.y -= Math.sin(angle) * force;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', debouncedResize);
      if (moveParticlesOnHover) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }
    };
  }, [particleCount, particleSpread, speed, particleColors, moveParticlesOnHover, particleHoverFactor, alphaParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'transparent',
      }}
    />
  );
});

Particles.displayName = 'Particles';

export default Particles; 