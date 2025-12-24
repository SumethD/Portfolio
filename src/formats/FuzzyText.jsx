import React, { useEffect, useRef, useState } from "react";

const FuzzyText = ({
  children,
  fontSize = "clamp(2rem, 10vw, 10rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#F97316",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameIdRef = useRef(null);
  const isHoveringRef = useRef(false);
  const lastFrameTimeRef = useRef(0);
  const offscreenRef = useRef(null);
  const dimensionsRef = useRef(null);
  
  // Throttle animation to ~30fps for better performance (every 33ms)
  const FRAME_INTERVAL = 33;

  // Set up intersection observer for visibility-based rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Main effect for canvas setup and animation
  useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === "inherit"
          ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
          : fontFamily;

      const fontSizeStr =
        typeof fontSize === "number" ? `${fontSize}px` : fontSize;
      let numericFontSize;
      if (typeof fontSize === "number") {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement("span");
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize);
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join("");

      // Create offscreen canvas (reuse if possible)
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent =
        metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      const horizontalMargin = 20;
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      // Store references for animation
      offscreenRef.current = offscreen;
      dimensionsRef.current = {
        offscreenWidth,
        tightHeight,
        interactiveLeft: horizontalMargin + xOffset,
        interactiveTop: verticalMargin,
        interactiveRight: horizontalMargin + xOffset + textBoundingWidth,
        interactiveBottom: verticalMargin + tightHeight,
        fuzzRange: 30
      };

      const isInsideTextArea = (x, y) => {
        const dims = dimensionsRef.current;
        return (
          x >= dims.interactiveLeft &&
          x <= dims.interactiveRight &&
          y >= dims.interactiveTop &&
          y <= dims.interactiveBottom
        );
      };

      const handleMouseMove = (e) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHoveringRef.current = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHoveringRef.current = false;
      };

      const handleTouchMove = (e) => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHoveringRef.current = isInsideTextArea(x, y);
      };

      const handleTouchEnd = () => {
        isHoveringRef.current = false;
      };

      if (enableHover) {
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
        canvas.addEventListener("touchend", handleTouchEnd);
      }

      const cleanup = () => {
        if (enableHover) {
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseleave", handleMouseLeave);
          canvas.removeEventListener("touchmove", handleTouchMove);
          canvas.removeEventListener("touchend", handleTouchEnd);
        }
      };

      canvas.cleanupFuzzyText = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText();
      }
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
  ]);

  // Separate effect for animation loop - only runs when visible
  useEffect(() => {
    if (!isVisible) {
      // Stop animation when not visible
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !offscreenRef.current || !dimensionsRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { offscreenWidth, tightHeight, fuzzRange } = dimensionsRef.current;
    const offscreen = offscreenRef.current;

    const run = (timestamp) => {
      // Throttle to ~30fps
      if (timestamp - lastFrameTimeRef.current < FRAME_INTERVAL) {
        animationFrameIdRef.current = window.requestAnimationFrame(run);
        return;
      }
      lastFrameTimeRef.current = timestamp;

      ctx.clearRect(
        -fuzzRange,
        -fuzzRange,
        offscreenWidth + 2 * fuzzRange,
        tightHeight + 2 * fuzzRange
      );
      const intensity = isHoveringRef.current ? hoverIntensity : baseIntensity;
      for (let j = 0; j < tightHeight; j++) {
        const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
        ctx.drawImage(
          offscreen,
          0,
          j,
          offscreenWidth,
          1,
          dx,
          j,
          offscreenWidth,
          1
        );
      }
      animationFrameIdRef.current = window.requestAnimationFrame(run);
    };

    animationFrameIdRef.current = window.requestAnimationFrame(run);

    return () => {
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isVisible, baseIntensity, hoverIntensity]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        position: 'relative',
        top: '0.1em',
      }} 
    />
  );
};

export default FuzzyText;
