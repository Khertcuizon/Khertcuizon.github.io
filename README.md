# Khert Cuizon Portfolio — React

A React 19 + Vite + React Router conversion of the original multi-page **Sunset Circuit** portfolio.

## Project Structure

```
react-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── assets/                  # All 19 original images & icons
└── src/
    ├── main.jsx                 # React 19 entry point
    ├── App.jsx                  # React Router configuration (all 9 routes + .html aliases)
    ├── style.css                # Complete Sunset Circuit theme & light/dark mode styles
    ├── hooks/
    │   └── useTheme.js          # Persistent dark/light theme state (localStorage)
    ├── utils/
    │   └── assets.js            # BASE_URL-safe asset path resolver
    ├── components/
    │   ├── Layout.jsx           # Shared wrapper (Navbar, Footer, ParticleCanvas, CursorGlow, ScrollProgress, BackToTop)
    │   ├── Navbar.jsx           # Responsive nav with interactive Services dropdown & theme toggle
    │   ├── Footer.jsx           # Footer with social icons
    │   ├── ParticleCanvas.jsx   # Animated background particle system
    │   ├── RevealUp.jsx         # IntersectionObserver scroll-reveal wrapper
    │   ├── TiltCard.jsx         # 3D perspective hover tilt card
    │   └── SocialIcons.jsx      # Instagram, GitHub, and Facebook SVG links
    └── pages/
        ├── HomePage.jsx
        ├── AboutPage.jsx
        ├── SkillsPage.jsx
        ├── ServicesPage.jsx
        ├── WebDevelopmentPage.jsx
        ├── MobileDevelopmentPage.jsx
        ├── GraphicDesignPage.jsx
        ├── BudgetTrackerPage.jsx
        └── ContactPage.jsx
```

## Run Locally

1. Install Node.js (LTS).
2. Extract this folder and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL printed by Vite (typically `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

The production-ready static bundle is output to `dist/`. Both clean paths (`/about`, `/services`, `/budget-tracker`) and legacy `.html` paths (`/about.html`, `/services.html`, `/budget-tracker.html`) are supported via React Router aliases.
