import React, { useEffect, useRef } from 'react';

export function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame = 0;
    let resizeTimer = null;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );
    }

    function initParticles() {
      const count = window.innerWidth < 768 ? 24 : 50;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        speedY: Math.random() * 0.3 + 0.08,
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.45 + 0.12,
        color: Math.random() > 0.5 ? '0,160,90' : '255,145,55',
      }));
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const viewTop = window.scrollY - 100;
      const viewBottom = window.scrollY + window.innerHeight + 100;

      particles.forEach((p) => {
        if (p.y >= viewTop && p.y <= viewBottom) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
          ctx.fill();
        }
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      animFrame = requestAnimationFrame(drawParticles);
    }

    function setupCanvas() {
      resizeCanvas();
      initParticles();
      cancelAnimationFrame(animFrame);
      drawParticles();
    }

    setupCanvas();

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupCanvas, 160);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas id="particles" ref={canvasRef} />;
}

export default ParticleCanvas;
