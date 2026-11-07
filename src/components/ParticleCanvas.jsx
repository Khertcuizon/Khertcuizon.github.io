import { useEffect, useRef } from 'react';

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let particles = [];
    let animationFrame = 0;
    let resizeTimer;

    function initialize() {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      const count = window.innerWidth < 768 ? 24 : 50;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.6,
        speedY: Math.random() * 0.3 + 0.08,
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.45 + 0.12,
        color: Math.random() > 0.5 ? '0,160,90' : '255,145,55',
      }));
    }

    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const visibleTop = window.scrollY - 100;
      const visibleBottom = window.scrollY + window.innerHeight + 100;

      particles.forEach((particle) => {
        if (particle.y >= visibleTop && particle.y <= visibleBottom) {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(${particle.color},${particle.opacity})`;
          context.fill();
        }

        particle.y -= particle.speedY;
        particle.x += particle.speedX;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
      });
      animationFrame = window.requestAnimationFrame(draw);
    }

    function resize() {
      window.cancelAnimationFrame(animationFrame);
      initialize();
      draw();
    }

    initialize();
    draw();
    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 160);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeTimer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas id="particles" ref={canvasRef} aria-hidden="true" />;
}

export { ParticleCanvas };
