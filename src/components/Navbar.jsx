import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAssetUrl } from '../utils/assets';

const SERVICE_ROUTES = [
  { to: '/services', label: 'Services Overview' },
  { to: '/web-development', label: 'Web Development' },
  { to: '/mobile-development', label: 'Mobile Development' },
  { to: '/graphic-design', label: 'Graphic Design' },
  { to: '/budget-tracker', label: 'Budget Tracker' },
];

export function Navbar({ theme, onToggleTheme, scrolled }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const normalizedPath = pathname.replace(/\.html$/, '') || '/';

  const isServiceActive = [
    '/services',
    '/web-development',
    '/mobile-development',
    '/graphic-design',
    '/budget-tracker',
  ].includes(normalizedPath);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const nextMode = theme === 'dark' ? 'light' : 'dark';

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo" aria-label="Khert Cuizon home">
          <img
            className="logo-image"
            src={getAssetUrl('kc-logo.png')}
            alt="KC logo"
          />
          <span className="logo-text">
            Khert<span>Cuizon</span>
          </span>
        </Link>

        <ul className={`nav-links${mobileOpen ? ' open' : ''}`} id="navLinks">
          <li>
            <Link
              to="/"
              className={`nav-link${normalizedPath === '/' || normalizedPath === '/index' ? ' active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link${normalizedPath === '/about' ? ' active' : ''}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/skills"
              className={`nav-link${normalizedPath === '/skills' ? ' active' : ''}`}
            >
              Skills
            </Link>
          </li>
          <li className="dropdown services-nav" ref={dropdownRef}>
            <Link
              to="/services"
              className={`nav-link${isServiceActive ? ' active' : ''}`}
            >
              Services
            </Link>
            <button
              id="dropdownBtn"
              className="dropdown-caret"
              type="button"
              aria-label="Open services menu"
              aria-expanded={dropdownOpen}
              aria-controls="dropdownMenu"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen((prev) => !prev);
              }}
            >
              <span id="dropdownArrow" className="dropdown-arrow">
                {dropdownOpen ? '▲' : '▼'}
              </span>
            </button>
            <ul
              id="dropdownMenu"
              className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}
            >
              {SERVICE_ROUTES.map((item) => {
                const isCurrentDetail =
                  item.to !== '/services' && normalizedPath === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={isCurrentDetail ? 'current-service' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link${normalizedPath === '/contact' ? ' active' : ''}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to="/contact" className="btn btn-glow nav-cta">
            Let&apos;s Connect
          </Link>
          <button
            className="theme-toggle"
            id="themeToggle"
            type="button"
            aria-label={`Switch to ${nextMode} mode`}
            title={`Switch to ${nextMode} mode`}
            onClick={onToggleTheme}
          >
            <span className="theme-icon" id="themeIcon" aria-hidden="true">
              {theme === 'dark' ? '☀' : '☾'}
            </span>
          </button>
          <button
            className={`nav-toggle${mobileOpen ? ' open' : ''}`}
            id="navToggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
