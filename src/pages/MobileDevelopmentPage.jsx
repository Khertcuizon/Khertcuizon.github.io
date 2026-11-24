import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import Layout from '../components/Layout';

export function MobileDevelopmentPage() {
  useEffect(() => {
    document.title = 'Mobile Development — Khert Cuizon';
  }, []);

  return (
    <Layout
      bodyClass="service-detail-page mobile-detail-page"
      showParticles={false}
      showFooter={false}
    >
      <main
        className="single-service"
        style={{
          '--service-bg': `url('${getAssetUrl('service-mobile-bg.png')}')`,
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
              <p className="service-kicker">Mobile Development</p>
              <h1>Laboratory Reservation App</h1>
              <p>
                I developed this mobile application using{' '}
                <strong>Flutter</strong> and <strong>Dart</strong>. I use{' '}
                <strong>Firebase</strong> for the database and backend services
                of the reservation system.
              </p>
              <div className="tech-tags">
                <span>Flutter</span>
                <span>Dart</span>
                <span>Firebase</span>
                <span>Mobile UI</span>
              </div>
            </div>
            <div className="single-service-media mobile-detail-media">
              <img
                alt="Laboratory Reservation app reservation screen"
                src={getAssetUrl('mobile-reservation.png')}
              />
              <img
                alt="Laboratory Reservation app admin access screen"
                src={getAssetUrl('mobile-admin.png')}
              />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default MobileDevelopmentPage;
