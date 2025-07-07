import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  className?: string;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - mix of Japanese katakana, numbers, and symbols
    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = matrixChars.split('');

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];
    const brightness: number[] = [];

    // Initialize drops with random starting positions and speeds
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
      speeds[i] = Math.random() * 0.5 + 0.5; // Random speed between 0.5 and 1
      brightness[i] = Math.random();
    }

    let animationId: number;

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Calculate position
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        // Create gradient effect - brighter at the head of the drop
        const alpha = Math.max(0.1, brightness[i]);
        
        // Bright green for the leading character
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
        }

        // Draw the character
        ctx.fillText(char, x, y);

        // Move the drop down
        drops[i] += speeds[i];

        // Reset drop when it goes off screen or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = Math.random() * 0.5 + 0.5;
          brightness[i] = Math.random();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    // Start the animation
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default MatrixBackground;