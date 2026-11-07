import { useEffect, useRef, useState } from 'react';

const serviceLinks = [
  ['Services Overview', 'services.html'],
  ['Web Development', 'web-development.html'],
  ['Mobile Development', 'mobile-development.html'],
  ['Graphic Design', 'graphic-design.html'],
  ['Budget Tracker', 'budget-tracker.html'],
];

export function Brand({ footer = false }) {
  return (
    <a className={`logo${footer ? ' footer-logo' : ''}`} href="index.html" aria-label="Khert Cuizon home">
      <img className="logo-image" src="/assets/kc-logo.png" alt="KC logo" />
      <span className="logo-text">
        Khert<span>Cuizon</span>
      </span>
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') || 'dark';
    } catch {
      return document.documentElement.dataset.theme || 'dark';
    }
  });
  const servicesRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Theme selection still works when browser storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener('click', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('click', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  function closeMenus() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  const isLight = theme === 'light';

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-inner">
        <Brand />
        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li>
            <a href="index.html" className="nav-link active" onClick={closeMenus}>
              Home
            </a>
          </li>
          <li>
            <a href="about.html" className="nav-link" onClick={closeMenus}>
              About
            </a>
          </li>
          <li>
            <a href="skills.html" className="nav-link" onClick={closeMenus}>
              Skills
            </a>
          </li>
          <li className="dropdown services-nav" ref={servicesRef}>
            <a href="services.html" className="nav-link" onClick={closeMenus}>
              Services
            </a>
            <button
              id="dropdownBtn"
              className="dropdown-caret"
              type="button"
              aria-label="Open services menu"
              aria-expanded={servicesOpen}
              aria-controls="dropdownMenu"
              onClick={() => setServicesOpen((open) => !open)}
            >
              <span className="dropdown-arrow" aria-hidden="true">
                {servicesOpen ? '▲' : '▼'}
              </span>
            </button>
            <ul
              id="dropdownMenu"
              className={`dropdown-menu${servicesOpen ? ' show' : ''}`}
            >
              {serviceLinks.map(([label, href]) => (
                <li key={href}>
                  <a href={href} onClick={closeMenus}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a href="contact.html" className="nav-link" onClick={closeMenus}>
              Contact
            </a>
          </li>
        </ul>
        <div className="nav-actions">
          <a href="contact.html" className="btn btn-glow nav-cta">
            Let&apos;s Connect
          </a>
          <button
            className="theme-toggle"
            id="themeToggle"
            type="button"
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
          >
            <span className="theme-icon" aria-hidden="true">
              {isLight ? '🌙' : '☀️'}
            </span>
          </button>
          <button
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            id="navToggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
