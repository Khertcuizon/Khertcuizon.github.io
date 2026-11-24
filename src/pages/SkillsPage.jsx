import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '../utils/assets';
import Layout from '../components/Layout';
import RevealUp from '../components/RevealUp';
import TiltCard from '../components/TiltCard';

const SKILLS = [
  { icon: '🌐', name: 'HTML', level: 85, delay: '' },
  { icon: '🎨', name: 'CSS', level: 80, delay: 'delay-1' },
  { icon: '📱', name: 'Flutter', level: 50, delay: 'delay-2' },
  { icon: '🔥', name: 'Firebase', level: 50, delay: 'delay-3' },
];

export function SkillsPage() {
  const sectionRef = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    document.title = 'Skills — Khert Cuizon';
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setFilled(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFilled(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout bodyClass="page-skills multi-page">
      <section className="section skills-section" id="skills" ref={sectionRef}>
        <div
          className="bg-layer"
          style={{ backgroundImage: `url('${getAssetUrl('skills.png')}')` }}
        />
        <div className="overlay" />
        <div className="section-inner skills-inner">
          <RevealUp as="span" className="eyebrow center">
            Skills
          </RevealUp>
          <RevealUp as="h2" className="section-title center">
            What I build with
          </RevealUp>
          <div className="skills-grid">
            {SKILLS.map((skill) => (
              <RevealUp key={skill.name} delay={skill.delay}>
                <TiltCard className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.name}</h3>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      data-level={skill.level}
                      style={{ width: filled ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                  <span className="progress-label">{skill.level}%</span>
                  <div className="card-reflection" />
                </TiltCard>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default SkillsPage;
