import React, { useEffect } from 'react';
import { getAssetUrl } from '../utils/assets';
import Layout from '../components/Layout';
import RevealUp from '../components/RevealUp';

export function AboutPage() {
  useEffect(() => {
    document.title = 'About — Khert Cuizon';
  }, []);

  return (
    <Layout bodyClass="page-about multi-page">
      <section className="section about-section" id="about">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url('${getAssetUrl('about.jpg')}')` }}
        />
        <div className="overlay" />
        <div className="section-inner about-inner">
          <RevealUp className="glass-panel about-panel">
            <div className="about-grid">
              <div className="about-image-wrap">
                <div className="about-image-frame">
                  <img
                    alt="Khert Cuizon portrait"
                    className="about-img"
                    src={getAssetUrl('profile.jpg')}
                  />
                </div>
              </div>
              <div className="about-content">
                <span className="eyebrow">About Me</span>
                <h2 className="section-title">
                  Turning coursework into{' '}
                  <span className="accent">working software.</span>
                </h2>
                <p className="about-bio">
                  I&apos;m a BSCS student at Tangub City Global College, Institute of
                  Computer Studies, focused on building things that actually run
                  — not just diagrams on a slide. My toolkit centers on{' '}
                  <strong>Flutter</strong> and <strong>Dart</strong> for
                  cross-platform apps, <strong>HTML</strong>,{' '}
                  <strong>CSS</strong>, and <strong>JavaScript</strong> for web
                  interfaces, and <strong>Firebase</strong> for app data and
                  backend services. Between thesis work, group projects, and
                  personal builds, I&apos;ve learned that good software is equal
                  parts logic and patience.
                </p>
                <div className="badge-grid">
                  <div className="feature-badge">
                    <span className="fb-icon">🧩</span>
                    <span>Problem Solver</span>
                  </div>
                  <div className="feature-badge">
                    <span className="fb-icon">⚡</span>
                    <span>Keep Growing</span>
                  </div>
                  <div className="feature-badge">
                    <span className="fb-icon">🤝</span>
                    <span>Team Player</span>
                  </div>
                  <div className="feature-badge">
                    <span className="fb-icon">📈</span>
                    <span>Always Improving</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealUp>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
