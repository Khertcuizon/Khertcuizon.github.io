import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import Layout from '../components/Layout';
import RevealUp from '../components/RevealUp';

export function ServicesPage() {
  useEffect(() => {
    document.title = 'Services — Khert Cuizon';
  }, []);

  return (
    <Layout bodyClass="page-services multi-page">
      <section className="section services-section" id="services">
        <div className="services-bg" />
        <div className="overlay" />
        <div className="section-inner services-inner">
          <RevealUp as="span" className="eyebrow center">
            Services
          </RevealUp>
          <RevealUp as="h2" className="section-title center">
            What I create
          </RevealUp>
          <RevealUp as="p" className="services-intro">
            Explore my web development projects, mobile development, and graphic
            design work.
          </RevealUp>

          <RevealUp
            as="article"
            className="service-showcase glass-panel"
            id="web-development"
          >
            <div className="service-copy">
              <p className="service-kicker">Web Development</p>
              <h3>Portfolio Website</h3>
              <p>
                I build responsive web pages using <strong>HTML</strong>,{' '}
                <strong>CSS</strong>, and <strong>Vanilla JavaScript</strong>.
                My web development section includes my current portfolio and my
                first portfolio project, both published with GitHub Pages.
              </p>
              <div className="tech-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>GitHub Pages</span>
              </div>
              <a
                className="btn btn-primary service-link"
                href="https://khertcuizon.github.io/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit My Portfolio
              </a>
              <Link
                className="btn btn-outline service-link service-detail-link"
                to="/web-development"
              >
                View Web Development Projects
              </Link>
            </div>
            <div className="service-media web-media">
              <img
                alt="Khert Cuizon portfolio website screenshot"
                src={getAssetUrl('web-development.png')}
              />
            </div>
          </RevealUp>

          <RevealUp
            as="article"
            className="service-showcase glass-panel"
            id="mobile-development"
          >
            <div className="service-copy">
              <p className="service-kicker">Mobile Development</p>
              <h3>Laboratory Reservation App</h3>
              <p>
                I developed this mobile application with <strong>Flutter</strong>{' '}
                and <strong>Dart</strong>. It uses <strong>Firebase</strong> as
                the database/backend for the reservation system.
              </p>
              <div className="tech-tags">
                <span>Flutter</span>
                <span>Dart</span>
                <span>Firebase</span>
                <span>Mobile UI</span>
              </div>
              <Link
                className="btn btn-primary service-link"
                to="/mobile-development"
              >
                View Mobile Development
              </Link>
            </div>
            <div className="service-media mobile-media">
              <img
                alt="Laboratory Reservation mobile app reservation screen"
                src={getAssetUrl('mobile-reservation.png')}
              />
              <img
                alt="Laboratory Reservation mobile app admin access screen"
                src={getAssetUrl('mobile-admin.png')}
              />
            </div>
          </RevealUp>

          <RevealUp
            as="article"
            className="service-showcase glass-panel"
            id="graphic-design"
          >
            <div className="service-copy">
              <p className="service-kicker">Graphic Design</p>
              <h3>UI/UX Design with Figma &amp; Canva</h3>
              <p>
                I use <strong>Figma</strong> and <strong>Canva</strong> to plan
                interfaces, create UI/UX layouts, and prepare visual designs
                before development.
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
              <Link
                className="btn btn-primary service-link"
                to="/graphic-design"
              >
                View Graphic Design
              </Link>
            </div>
            <div className="service-media design-media">
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
          </RevealUp>

          <RevealUp
            as="article"
            className="service-showcase glass-panel"
            id="budget-tracker"
          >
            <div className="service-copy">
              <p className="service-kicker">Finance Tool</p>
              <h3>Budget Tracker Dashboard</h3>
              <p>
                I created a simple personal budget tracker to manage income,
                expenses, and remaining balance using a polished, interactive web
                interface.
              </p>
              <div className="tech-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>Local Storage</span>
              </div>
              <Link
                className="btn btn-primary service-link"
                to="/budget-tracker"
              >
                Open Budget Tracker
              </Link>
            </div>
            <div className="service-media web-media">
              <img
                alt="Budget tracker dashboard screenshot"
                src={getAssetUrl('budge-tracker.png')}
              />
            </div>
          </RevealUp>
        </div>
      </section>
    </Layout>
  );
}

export default ServicesPage;
