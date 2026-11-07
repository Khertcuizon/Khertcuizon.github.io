import { useEffect, useState } from 'react';

function usePortfolioEffects() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function updateScrollState() {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);
      setShowBackToTop(scrollY > 500);
      document.getElementById('navbar')?.classList.toggle('scrolled', scrollY > 40);
    }

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return { progress, showBackToTop };
}

export { usePortfolioEffects };
