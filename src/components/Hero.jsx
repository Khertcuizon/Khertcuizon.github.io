import { useEffect, useRef, useState } from 'react';
import SocialLinks from './SocialLinks.jsx';

const phrases = ['BSCS Student', 'Aspiring Software Developer', 'Flutter & Web Builder'];

function Reveal({ children, className = '' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;
    if (!('IntersectionObserver' in window)) {
      element.classList.add('visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('visible');
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`reveal-up ${className}`} ref={elementRef}>
      {children}
    </div>
  );
}

function useTypingEffect() {
  const [text, setText] = useState('');

  useEffect(() => {
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeoutId;

    function typeNext() {
      const phrase = phrases[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      setText(phrase.slice(0, characterIndex));

      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        timeoutId = window.setTimeout(typeNext, 1600);
        return;
      }

      if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }

      timeoutId = window.setTimeout(typeNext, deleting ? 40 : 75);
    }

    timeoutId = window.setTimeout(typeNext, 75);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return text;
}

function Hero({ homeRef, visualRef }) {
  const typedText = useTypingEffect();
  const cardRef = useRef(null);

  function handleCardMouseMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2)) * -8;
    const rotateY = ((event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2)) * 8;
    event.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }

  function resetCardTilt() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    }
  }

  return (
    <section className="section home-section" id="home" ref={homeRef}>
      <div
        className="bg-layer"
        style={{ backgroundImage: "url('/assets/home1.jpg')" }}
        aria-hidden="true"
      />
      <div className="overlay" aria-hidden="true" />
      <div className="circuit-lines" aria-hidden="true" />
      <div className="section-inner home-inner">
        <Reveal className="home-text">
          <div className="badge">
            <span className="badge-icon">&lt;/&gt;</span> Hello, I&apos;m
          </div>
          <h1 className="hero-title">
            <span className="title-line">Khert</span>
            <span className="title-line accent">Cuizon</span>
          </h1>
          <p className="hero-subtitle" aria-live="polite">
            <span>{typedText}</span>
            <span className="cursor-blink" aria-hidden="true">
              |
            </span>
          </p>
          <p className="hero-desc">
            Building clean, functional web and mobile experiences — from Flutter apps to
            database-driven systems. I turn logic into interfaces people actually enjoy using.
          </p>
          <div className="hero-buttons">
            <a className="btn btn-primary" href="services.html">
              View My Work
            </a>
            <a className="btn btn-outline" href="contact.html">
              Contact Me
            </a>
          </div>
          <SocialLinks />
        </Reveal>
        <Reveal className="delay-2">
          <div className="home-visual" ref={visualRef}>
            <div className="rings" aria-hidden="true">
              <div className="ring ring-1" />
              <div className="ring ring-2" />
              <div className="ring ring-3" />
            </div>
            <div
              className="profile-card tilt-card"
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={resetCardTilt}
            >
              <div className="hex-frame">
                <img
                  alt="Khert Cuizon"
                  className="profile-img"
                  src="/assets/profile.jpg"
                />
              </div>
              <div className="code-snippet">
                <span className="cs-line">
                  <span className="cs-key">const</span> dev <span className="cs-op">=</span> {'{'}
                </span>
                <span className="cs-line">
                  &nbsp;&nbsp;name: <span className="cs-str">&quot;Khert Cuizon&quot;</span>,
                </span>
                <span className="cs-line">
                  &nbsp;&nbsp;role: <span className="cs-str">&quot;BSCS Student&quot;</span>,
                </span>
                <span className="cs-line">
                  &nbsp;&nbsp;status: <span className="cs-str">&quot;building...&quot;</span>
                </span>
                <span className="cs-line">{'};'}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <a aria-label="Scroll down" className="scroll-cue" href="about.html">
        <span />
      </a>
    </section>
  );
}

export default Hero;
