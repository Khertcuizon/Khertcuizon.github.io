import { useRef } from 'react';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import { ParticleCanvas } from './components/ParticleCanvas.jsx';
import { usePortfolioEffects } from './hooks/usePortfolioEffects.js';

function App() {
  const homeRef = useRef(null);
  const visualRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const { progress, showBackToTop } = usePortfolioEffects();

  function handleMouseMove(event) {
    if (cursorGlowRef.current) {
      cursorGlowRef.current.style.left = `${event.clientX}px`;
      cursorGlowRef.current.style.top = `${event.clientY}px`;
    }

    if (!homeRef.current || !visualRef.current) return;
    const bounds = homeRef.current.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      const offsetX = (event.clientX / window.innerWidth - 0.5) * 28;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * 28;
      visualRef.current.style.translate = `${offsetX}px ${offsetY}px`;
    }
  }

  return (
    <div onMouseMove={handleMouseMove}>
      <ParticleCanvas />
      <div className="cursor-glow" ref={cursorGlowRef} />
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Navbar />
      <main>
        <Hero homeRef={homeRef} visualRef={visualRef} />
      </main>
      <Footer />
      <button
        className={`back-to-top${showBackToTop ? ' show' : ''}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
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
    </div>
  );
}

export default App;
