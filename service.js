// ========================================================================== 
// SERVICE PAGES — VANILLA JAVASCRIPT NAVBAR DROPDOWN
// ========================================================================== 

document.addEventListener('DOMContentLoaded', function () {
  // Required DOM selectors for the JavaScript DOM Activity.
  const dropdownButton = document.querySelector('#dropdownBtn');
  const dropdownMenu = document.querySelector('#dropdownMenu');
  const dropdownArrow = document.querySelector('#dropdownArrow');
  const dropdown = document.querySelector('.dropdown');

  // Required click event + classList.toggle().
  dropdownButton.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle('show');

    const isOpen = dropdownMenu.classList.contains('show');
    dropdownButton.setAttribute('aria-expanded', String(isOpen));
    dropdownArrow.textContent = isOpen ? '▲' : '▼';
  });

  // Bonus 1: close the dropdown when clicking outside it.
  document.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
      dropdownMenu.classList.remove('show');
      dropdownButton.setAttribute('aria-expanded', 'false');
      dropdownArrow.textContent = '▼';
    }
  });

  // Close after choosing a menu item.
  dropdownMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      dropdownMenu.classList.remove('show');
      dropdownButton.setAttribute('aria-expanded', 'false');
      dropdownArrow.textContent = '▼';
    });
  });

  // Bonus 4: responsive mobile navigation.
  const navToggle = document.querySelector('#navToggle');
  const navLinks = document.querySelector('#navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
});
