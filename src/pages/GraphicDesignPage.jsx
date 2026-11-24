import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import Layout from '../components/Layout';

export function GraphicDesignPage() {
  useEffect(() => {
    document.title = 'Graphic Design — Khert Cuizon';
  }, []);

  return (
    <Layout
      bodyClass="service-detail-page graphic-detail-page"
      showParticles={false}
      showFooter={false}
    >
      <main
        className="single-service"
        style={{
          '--service-bg': `url('${getAssetUrl('service-graphic-bg.jpg')}')`,
        }}
      >
        <div className="single-service-overlay" />
        <div className="single-service-inner">
          <Link className="service-back" to="/services">
            ← Back to Services
          </Link>
          <section className="single-service-card">
            <div className="single-service-copy">
              <span className="service-number">01</span>
              <p className="service-kicker">Graphic Design</p>
              <h1>UI/UX Design with Figma &amp; Canva</h1>
              <p>
                I use <strong>Figma</strong> and <strong>Canva</strong> to
                design UI/UX layouts, plan interfaces, create prototypes, and
                prepare visuals before development.
              </p>
              <div className="tech-tags">
                <span>Figma</span>
                <span>Canva</span>
                <span>UI/UX</span>
                <span>Prototyping</span>
              </div>
              <div className="design-links">
                <a
                  className="btn btn-outline"
                  href="https://www.figma.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open Figma
                </a>
                <a
                  className="btn btn-outline"
                  href="https://www.canva.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open Canva
                </a>
              </div>
            </div>
            <div className="single-service-media graphic-detail-media">
              <figure>
                <img
                  alt="Figma design workspace screenshot"
                  src={getAssetUrl('graphic-figma.png')}
                />
                <figcaption>Figma</figcaption>
              </figure>
              <figure>
                <img
                  alt="Canva design workspace screenshot"
                  src={getAssetUrl('graphic-canva.png')}
                />
                <figcaption>Canva</figcaption>
              </figure>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default GraphicDesignPage;
