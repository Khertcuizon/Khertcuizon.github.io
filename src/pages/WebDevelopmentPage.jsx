import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import Layout from '../components/Layout';

export function WebDevelopmentPage() {
  useEffect(() => {
    document.title = 'Web Development — Khert Cuizon';
  }, []);

  return (
    <Layout
      bodyClass="service-detail-page web-detail-page"
      showParticles={false}
      showFooter={false}
    >
      <main
        className="single-service web-projects-page"
        style={{
          '--service-bg': `url('${getAssetUrl('service-web-bg.jpg')}')`,
        }}
      >
        <div className="single-service-overlay" />
        <div className="single-service-inner">
          <Link className="service-back" to="/services">
            ← Back to Services
          </Link>

          <div className="web-projects-heading">
            <p className="service-kicker">Web Development</p>
            <h1>My Web Development Projects</h1>
            <p>
              These are websites I created using HTML, CSS, JavaScript, and
              GitHub Pages.
            </p>
          </div>

          <section className="single-service-card web-project-card">
            <div className="single-service-copy">
              <span className="service-number">PROJECT 01</span>
              <p className="service-kicker">Current Portfolio</p>
              <h2>Portfolio Website</h2>
              <p>
                I built this responsive portfolio using <strong>HTML</strong>,{' '}
                <strong>CSS</strong>, and <strong>Vanilla JavaScript</strong>.
                It presents my skills, services, projects, and contact
                information.
              </p>
              <div className="tech-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>GitHub Pages</span>
              </div>
              <a
                className="btn btn-primary"
                href="https://khertcuizon.github.io/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit My Portfolio
              </a>
            </div>
            <div className="single-service-media web-detail-media">
              <img
                alt="Khert Cuizon current portfolio website"
                src={getAssetUrl('web-development.png')}
              />
            </div>
          </section>

          <section className="single-service-card web-project-card first-web-project">
            <div className="single-service-copy">
              <span className="service-number">PROJECT 02</span>
              <p className="service-kicker">My First Portfolio</p>
              <h2>My First Portfolio</h2>
              <p>
                My first personal portfolio introduced my profile and featured
                my <strong>LUX MUNDI Cup 2024</strong> experience and event
                gallery. This project helped me practice building and publishing
                a complete website.
              </p>
              <div className="tech-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>Personal Portfolio</span>
                <span>GitHub Pages</span>
              </div>
              <a
                className="btn btn-primary"
                href="https://khertcuizon.github.io/KHERT.BSCS.TCGC.CUIZON/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Visit My First Portfolio
              </a>
            </div>
            <div className="single-service-media first-portfolio-media web-first-portfolio-media">
              <img
                className="first-portfolio-main"
                alt="My First Portfolio home page"
                src={getAssetUrl('first-portfolio-home.png')}
              />
              <img
                alt="My First Portfolio about page featuring LUX MUNDI Cup 2024"
                src={getAssetUrl('first-portfolio-about.png')}
              />
              <img
                alt="My First Portfolio gallery page"
                src={getAssetUrl('first-portfolio-gallery.png')}
              />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default WebDevelopmentPage;
