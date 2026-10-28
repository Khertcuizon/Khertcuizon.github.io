// ========================================================================== 
// KHERT CUIZON PORTFOLIO — SHARED SCRIPT
// ========================================================================== 

document.addEventListener('DOMContentLoaded', function () {
  const root = document.documentElement;

  /* ---------- LIGHT / DARK MODE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
    if (themeToggle) {
      const nextMode = theme === 'dark' ? 'light' : 'dark';
      themeToggle.setAttribute('aria-label', 'Switch to ' + nextMode + ' mode');
      themeToggle.setAttribute('title', 'Switch to ' + nextMode + ' mode');
    }
  }

  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('portfolio-theme') || root.dataset.theme || 'dark';
  } catch (e) {
    savedTheme = root.dataset.theme || 'dark';
  }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      try { localStorage.setItem('portfolio-theme', nextTheme); } catch (e) {}
    });
  }

  /* ---------- NAVBAR + SCROLL ---------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 40);
    if (backToTop) backToTop.classList.toggle('show', y > 500);

    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- MOBILE NAV ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- SERVICES DROPDOWN ---------- */
  const dropdownButton = document.getElementById('dropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const dropdownArrow = document.getElementById('dropdownArrow');
  const dropdown = document.querySelector('.dropdown');

  function closeDropdown() {
    if (!dropdownMenu || !dropdownButton) return;
    dropdownMenu.classList.remove('show');
    dropdownButton.setAttribute('aria-expanded', 'false');
    if (dropdownArrow) dropdownArrow.textContent = '▼';
  }

  if (dropdownButton && dropdownMenu && dropdown) {
    dropdownButton.addEventListener('click', function (event) {
      event.stopPropagation();
      const isOpen = dropdownMenu.classList.toggle('show');
      dropdownButton.setAttribute('aria-expanded', String(isOpen));
      if (dropdownArrow) dropdownArrow.textContent = isOpen ? '▲' : '▼';
    });

    document.addEventListener('click', function (event) {
      if (!dropdown.contains(event.target)) closeDropdown();
    });

    dropdownMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDropdown);
    });
  }

  /* ---------- REVEAL ANIMATION ---------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- HOME TYPING EFFECT ---------- */
  const typedText = document.getElementById('typedText');
  if (typedText) {
    const phrases = ['BSCS Student', 'Aspiring Software Developer', 'Flutter & Web Builder'];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex += 1;
        typedText.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIndex -= 1;
        typedText.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 40 : 75);
    }
    typeLoop();
  }

  /* ---------- 3D TILT ---------- */
  document.querySelectorAll('.tilt-card').forEach(function (card) {
    card.addEventListener('mousemove', function (event) {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
      card.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(10px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });

  /* ---------- CURSOR + HOME PARALLAX ---------- */
  const homeSection = document.querySelector('.home-section');
  const homeVisual = document.querySelector('.home-visual');
  const cursorGlow = document.getElementById('cursorGlow');

  document.addEventListener('mousemove', function (event) {
    if (cursorGlow) {
      cursorGlow.style.left = event.clientX + 'px';
      cursorGlow.style.top = event.clientY + 'px';
    }
    if (homeSection && homeVisual) {
      const rect = homeSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const relX = (event.clientX / window.innerWidth - 0.5) * 2;
        const relY = (event.clientY / window.innerHeight - 0.5) * 2;
        homeVisual.style.transform = 'translate3d(' + (relX * 14) + 'px,' + (relY * 14) + 'px,0)';
      }
    }
  });

  /* ---------- SKILL BARS ---------- */
  const skillsSection = document.getElementById('skills');
  const progressFills = document.querySelectorAll('.progress-fill');

  function fillSkills() {
    progressFills.forEach(function (fill) {
      fill.style.width = (fill.getAttribute('data-level') || '0') + '%';
    });
  }

  if (skillsSection && progressFills.length) {
    if ('IntersectionObserver' in window) {
      const skillsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fillSkills();
            skillsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      skillsObserver.observe(skillsSection);
    } else {
      fillSkills();
    }
  }

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (formStatus) formStatus.textContent = 'Message sent — thanks for reaching out! I\'ll reply soon.';
      contactForm.reset();
      if (formStatus) {
        setTimeout(function () { formStatus.textContent = ''; }, 5000);
      }
    });
  }

  /* ---------- PARTICLE CANVAS ---------- */
  const canvas = document.getElementById('particles');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame = 0;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    }

    function initParticles() {
      const count = window.innerWidth < 768 ? 24 : 50;
      particles = Array.from({ length: count }, function () {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.6,
          speedY: Math.random() * 0.3 + 0.08,
          speedX: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.45 + 0.12,
          color: Math.random() > 0.5 ? '0,160,90' : '255,145,55'
        };
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const viewTop = window.scrollY - 100;
      const viewBottom = window.scrollY + window.innerHeight + 100;

      particles.forEach(function (p) {
        if (p.y >= viewTop && p.y <= viewBottom) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + p.color + ',' + p.opacity + ')';
          ctx.fill();
        }
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      animFrame = requestAnimationFrame(drawParticles);
    }

    function setupCanvas() {
      resizeCanvas();
      initParticles();
      cancelAnimationFrame(animFrame);
      drawParticles();
    }

    setupCanvas();
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupCanvas, 160);
    });
  }
});
