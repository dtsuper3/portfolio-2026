'use client';

import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters: Katakana + Latin + Numerals
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>/?ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const charArray = chars.split('');

    const fontSize = 16;
    let columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops array
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random negative y positions so they don't all fall at once
    }

    // Handle resize logic for columns
    const handleResizeColumns = () => {
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      }
      columns = newColumns;
    };
    window.addEventListener('resize', handleResizeColumns);


    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Neon green text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // x coordinate is column index * font size
        // y coordinate is drop index * font size
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Add a glow effect occasionally
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#FFF';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#0F0';
        } else {
          ctx.fillStyle = '#0F0';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly when it crosses the screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    // Start animation
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', handleResizeColumns);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.3 }} // Subtle background effect
    />
  );
};

export default MatrixRain;
