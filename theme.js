(function () {
  const root = document.documentElement;
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('portfolio-theme');
  } catch (error) {
    savedTheme = null;
  }
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);

    const button = document.getElementById('themeToggle');
    if (!button) return;

    const isLight = theme === 'light';
    const icon = button.querySelector('.theme-icon');
    const label = button.querySelector('.theme-label');

    icon.textContent = isLight ? '🌙' : '☀️';
    label.textContent = isLight ? 'Dark' : 'Light';
    button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    button.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }

  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(root.getAttribute('data-theme') || initialTheme);

    const button = document.getElementById('themeToggle');
    if (!button) return;

    button.addEventListener('click', function () {
      const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('portfolio-theme', nextTheme);
      } catch (error) {
        // The theme still changes even when browser storage is unavailable.
      }
      applyTheme(nextTheme);
    });
  });
})();
