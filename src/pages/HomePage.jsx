import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import Layout from '../components/Layout';
import RevealUp from '../components/RevealUp';
import TiltCard from '../components/TiltCard';
import SocialIcons from '../components/SocialIcons';

const PHRASES = [
  'BSCS Student',
  'Aspiring Software Developer',
  'Flutter & Web Builder',
];

export function HomePage() {
  const [typedText, setTypedText] = useState('');
  const homeSectionRef = useRef(null);
  const homeVisualRef = useRef(null);

  useEffect(() => {
    document.title = 'Khert Cuizon — Home';
  }, []);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timerId = null;

    function typeLoop() {
      const current = PHRASES[phraseIndex];
      if (!deleting) {
        charIndex += 1;
        setTypedText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timerId = setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIndex -= 1;
        setTypedText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
        }
      }
      timerId = setTimeout(typeLoop, deleting ? 40 : 75);
    }

    typeLoop();
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    function handleMouseMove(event) {
      const section = homeSectionRef.current;
      const visual = homeVisualRef.current;
      if (!section || !visual) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const relX = (event.clientX / window.innerWidth - 0.5) * 2;
        const relY = (event.clientY / window.innerHeight - 0.5) * 2;
        visual.style.transform = `translate3d(${relX * 14}px,${relY * 14}px,0)`;
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Layout bodyClass="page-home multi-page">
      <section className="section home-section" id="home" ref={homeSectionRef}>
        <div
          className="bg-layer"
          style={{ backgroundImage: `url('${getAssetUrl('home1.jpg')}')` }}
        />
        <div className="overlay" />
        <div className="circuit-lines" />

        <div className="section-inner home-inner">
          <RevealUp className="home-text">
            <div className="badge">
              <span className="badge-icon">&lt;/&gt;</span> Hello, I&apos;m
            </div>
            <h1 className="hero-title">
              <span className="title-line">Khert</span>
              <span className="title-line accent">Cuizon</span>
            </h1>
            <p className="hero-subtitle">
              <span id="typedText">{typedText}</span>
              <span className="cursor-blink">|</span>
            </p>
            <p className="hero-desc">
              Building clean, functional web and mobile experiences — from
              Flutter apps to database-driven systems. I turn logic into
              interfaces people actually enjoy using.
            </p>
            <div className="hero-buttons">
              <Link className="btn btn-primary" to="/services">
                View My Work
              </Link>
              <Link className="btn btn-outline" to="/contact">
                Contact Me
              </Link>
            </div>
            <SocialIcons />
          </RevealUp>

          <RevealUp className="home-visual" delay="delay-2">
            <div ref={homeVisualRef}>
              <div className="rings">
                <div className="ring ring-1" />
                <div className="ring ring-2" />
                <div className="ring ring-3" />
              </div>
              <TiltCard className="profile-card" id="profileCard">
                <div className="hex-frame">
                  <img
                    alt="Khert Cuizon"
                    className="profile-img"
                    src={getAssetUrl('profile.jpg')}
                  />
                </div>
                <div className="code-snippet">
                  <span className="cs-line">
                    <span className="cs-key">const</span> dev{' '}
                    <span className="cs-op">=</span> {'{'}
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
                  <span className="cs-line">{'}'};</span>
                </div>
              </TiltCard>
            </div>
          </RevealUp>
        </div>

        <Link aria-label="Scroll down" className="scroll-cue" to="/about">
          <span />
        </Link>
      </section>
    </Layout>
  );
}

export default HomePage;
