import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleCanvas from './ParticleCanvas';

export function Layout({
  bodyClass = '',
  showParticles = true,
  showFooter = true,
  children,
}) {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    const prevClassName = document.body.className;
    document.body.className = bodyClass;
    return () => {
      document.body.className = prevClassName;
    };
  }, [bodyClass]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowBackToTop(y > 500);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
      setScrollProgress(progress);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    function handleMouseMove(event) {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${event.clientX}px`;
        cursorGlowRef.current.style.top = `${event.clientY}px`;
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showParticles && <ParticleCanvas />}
      {showParticles && (
        <>
          <div className="cursor-glow" id="cursorGlow" ref={cursorGlowRef} />
          <div
            className="scroll-progress"
            id="scrollProgress"
            style={{ width: `${scrollProgress}%` }}
          />
        </>
      )}

      <Navbar theme={theme} onToggleTheme={toggleTheme} scrolled={scrolled} />

      {children}

      {showFooter && <Footer />}

      {showFooter && (
        <button
          className={`back-to-top${showBackToTop ? ' show' : ''}`}
          id="backToTop"
          type="button"
          aria-label="Back to top"
          onClick={handleBackToTop}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M12 19V5M5 12l7-7 7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
}

export default Layout;
