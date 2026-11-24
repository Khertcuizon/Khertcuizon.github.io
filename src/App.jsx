import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ServicesPage from './pages/ServicesPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import MobileDevelopmentPage from './pages/MobileDevelopmentPage';
import GraphicDesignPage from './pages/GraphicDesignPage';
import BudgetTrackerPage from './pages/BudgetTrackerPage';
import ContactPage from './pages/ContactPage';

export function App() {
  return (
    <Routes>
      {/* Primary clean routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/web-development" element={<WebDevelopmentPage />} />
      <Route path="/mobile-development" element={<MobileDevelopmentPage />} />
      <Route path="/graphic-design" element={<GraphicDesignPage />} />
      <Route path="/budget-tracker" element={<BudgetTrackerPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Legacy .html route aliases */}
      <Route path="/index.html" element={<HomePage />} />
      <Route path="/about.html" element={<AboutPage />} />
      <Route path="/skills.html" element={<SkillsPage />} />
      <Route path="/services.html" element={<ServicesPage />} />
      <Route path="/web-development.html" element={<WebDevelopmentPage />} />
      <Route
        path="/mobile-development.html"
        element={<MobileDevelopmentPage />}
      />
      <Route path="/graphic-design.html" element={<GraphicDesignPage />} />
      <Route path="/budget-tracker.html" element={<BudgetTrackerPage />} />
      <Route path="/contact.html" element={<ContactPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
