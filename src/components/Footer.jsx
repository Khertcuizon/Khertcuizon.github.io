import SocialLinks from './SocialLinks.jsx';
import { Brand } from './Navbar.jsx';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-circuit" aria-hidden="true" />
      <div className="footer-inner">
        <Brand footer />
        <p className="footer-tagline">Code. Create. Innovate.</p>
        <SocialLinks footer />
        <p className="footer-copy">© 2025 Khert Cuizon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
