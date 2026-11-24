import React from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';
import SocialIcons from './SocialIcons';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-circuit"></div>
      <div className="footer-inner">
        <Link className="logo footer-logo" to="/">
          <img
            className="logo-image"
            src={getAssetUrl('kc-logo.png')}
            alt="KC logo"
          />
          <span className="logo-text">
            Khert<span>Cuizon</span>
          </span>
        </Link>
        <p className="footer-tagline">Code. Create. Innovate.</p>
        <SocialIcons className="footer-socials" />
        <p className="footer-copy">© 2025 Khert Cuizon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
