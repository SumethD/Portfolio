import React, { useEffect, useRef } from 'react';

const Particles = ({
  particleCount = 150,
  particleSpread = 3,
  speed = 0.3,
  particleColors = ['#ffffff'],
  moveParticlesOnHover = true,
  particleHoverFactor = 2,
  alphaParticles = true,
}) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * particleSpread + 0.5,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          speedX: Math.random() * speed - speed / 2,
          speedY: Math.random() * speed - speed / 2,
          alpha: alphaParticles ? Math.random() * 0.3 + 0.1 : 1,
          originalX: 0,
          originalY: 0,
          targetX: 0,
          targetY: 0,
        });
      }
    };
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
    };
    
    // Update and draw particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Save original position on first hover
        if (isHovering && p.originalX === 0 && p.originalY === 0) {
          p.originalX = p.x;
          p.originalY = p.y;
        }
        
        // Update position with base movement
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Handle hover effect
        if (moveParticlesOnHover) {
          if (isHovering) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            
            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance;
              const angle = Math.atan2(dy, dx);
              const repelX = Math.cos(angle) * force * particleHoverFactor;
              const repelY = Math.sin(angle) * force * particleHoverFactor;
              
              // Move away from cursor
              p.targetX = p.x - repelX * 5;
              p.targetY = p.y - repelY * 5;
              
              // Smooth transition to target
              p.x += (p.targetX - p.x) * 0.1;
              p.y += (p.targetY - p.y) * 0.1;
            } else if (p.originalX !== 0) {
              // Slowly return to original path when out of hover range
              p.x += (p.originalX + p.speedX * performance.now() * 0.01 - p.x) * 0.01;
              p.y += (p.originalY + p.speedY * performance.now() * 0.01 - p.y) * 0.01;
            }
          } else if (p.originalX !== 0) {
            // Return to original position when not hovering
            p.x += (p.originalX + p.speedX * performance.now() * 0.01 - p.x) * 0.01;
            p.y += (p.originalY + p.speedY * performance.now() * 0.01 - p.y) * 0.01;
            
            // Reset original position when particle is close to its path
            const distToOriginal = Math.sqrt(
              Math.pow(p.x - (p.originalX + p.speedX * performance.now() * 0.01), 2) + 
              Math.pow(p.y - (p.originalY + p.speedY * performance.now() * 0.01), 2)
            );
            
            if (distToOriginal < 1) {
              p.originalX = 0;
              p.originalY = 0;
            }
          }
        }
        
        // Wrap around screen edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (alphaParticles) {
          ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
        } else {
          ctx.fillStyle = p.color;
        }
        ctx.fill();
      });
      
      // Draw connections between particles
      if (alphaParticles) {
        particles.forEach((p1, i) => {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Set up
    handleResize();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, particleSpread, speed, particleColors, moveParticlesOnHover, particleHoverFactor, alphaParticles]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0" 
      style={{ backgroundColor: 'transparent' }}
    />
  );
};

export default Particles;
