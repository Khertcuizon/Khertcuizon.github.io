document.addEventListener('DOMContentLoaded', function () {
  const storageKey = 'khert-budget-tracker';

  const defaultEntries = [
    { id: 1, title: 'Freelance Design', amount: 15000, type: 'income', category: 'Freelance', date: '2026-09-10' },
    { id: 2, title: 'Groceries', amount: 2450, type: 'expense', category: 'Food', date: '2026-09-12' },
    { id: 3, title: 'Transport Pass', amount: 1300, type: 'expense', category: 'Transport', date: '2026-09-14' },
    { id: 4, title: 'Side Hustle', amount: 7200, type: 'income', category: 'Salary', date: '2026-09-17' }
  ];

  const form = document.getElementById('budgetForm');
  const titleInput = document.getElementById('transactionTitle');
  const amountInput = document.getElementById('transactionAmount');
  const typeInput = document.getElementById('transactionType');
  const categoryInput = document.getElementById('transactionCategory');
  const dateInput = document.getElementById('transactionDate');
  const transactionList = document.getElementById('transactionList');
  const clearButton = document.getElementById('clearBudget');

  const incomeTotalEl = document.getElementById('incomeTotal');
  const expenseTotalEl = document.getElementById('expenseTotal');
  const balanceTotalEl = document.getElementById('balanceTotal');
  const totalsCountEl = document.getElementById('totalCount');
  const budgetSummaryEl = document.getElementById('budgetSummary');

  function normalizeEntry(entry) {
    if (!entry || typeof entry !== 'object') return null;

    const type = entry.type === 'income' ? 'income' : 'expense';
    const category = entry.category || 'Other';
    const fallbackTitle = `${type === 'income' ? 'Income' : 'Expense'} - ${category}`;
    const title = entry.title || entry.name || fallbackTitle;
    const amount = Number(entry.amount ?? entry.value ?? 0);
    const date = entry.date || new Date().toISOString().slice(0, 10);

    if (!Number.isFinite(amount) || amount <= 0) return null;

    return {
      id: Number(entry.id) || Date.now() + Math.random(),
      title: String(title),
      amount,
      type,
      category: String(category),
      date: String(date)
    };
  }

  function loadEntries() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (Array.isArray(saved) && saved.length) {
        const normalized = saved
          .map(normalizeEntry)
          .filter(Boolean);

        if (normalized.length) return normalized;
      }
    } catch (error) {
      console.warn('Unable to load saved budget data.', error);
    }
    return defaultEntries;
  }

  let entries = loadEntries();

  function saveEntries() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(entries));
    } catch (error) {
      console.warn('Unable to save budget data.', error);
    }
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function formatDate(dateString) {
    if (!dateString) return 'No date';
    const date = new Date(dateString + 'T12:00:00');
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }

  function calculateTotals() {
    const income = entries
      .filter((entry) => entry.type === 'income')
      .reduce((sum, entry) => sum + Number(entry.amount), 0);

    const expenses = entries
      .filter((entry) => entry.type === 'expense')
      .reduce((sum, entry) => sum + Number(entry.amount), 0);

    const balance = income - expenses;

    return { income, expenses, balance, totalCount: entries.length };
  }

  function renderSummary() {
    const totals = calculateTotals();

    incomeTotalEl.textContent = formatCurrency(totals.income);
    expenseTotalEl.textContent = formatCurrency(totals.expenses);
    balanceTotalEl.textContent = formatCurrency(totals.balance);
    totalsCountEl.textContent = String(totals.totalCount);

    balanceTotalEl.classList.toggle('negative', totals.balance < 0);

    const status = totals.balance >= 0 ? 'On track' : 'Needs attention';
    budgetSummaryEl.textContent = status + ' • ' + formatCurrency(Math.abs(totals.balance)) + ' ' + (totals.balance >= 0 ? 'remaining' : 'over budget');
  }

  function renderTransactions() {
    if (!transactionList) return;

    if (!entries.length) {
      transactionList.innerHTML = `
        <li class="empty-state">
          <p>No transactions yet.</p>
          <span>Add your first income or expense to begin tracking your budget.</span>
        </li>
      `;
      return;
    }

    transactionList.innerHTML = entries
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((entry) => `
        <li class="transaction-item ${entry.type === 'income' ? 'income' : 'expense'}">
          <div class="transaction-main">
            <div class="transaction-copy">
              <strong>${escapeHtml(entry.title)}</strong>
              <span>${escapeHtml(entry.category)} • ${formatDate(entry.date)}</span>
            </div>
            <span class="transaction-tag">${entry.type === 'income' ? 'Income' : 'Expense'}</span>
          </div>
          <div class="transaction-side">
            <span class="transaction-amount">${entry.type === 'income' ? '+' : '-'}${formatCurrency(Number(entry.amount))}</span>
            <button type="button" class="delete-transaction" data-id="${entry.id}" aria-label="Delete ${escapeHtml(entry.title)}">Delete</button>
          </div>
        </li>
      `)
      .join('');
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function resetForm() {
    if (!form) return;
    form.reset();
    if (typeInput) typeInput.value = 'expense';
    if (categoryInput) categoryInput.value = 'Food';
    if (dateInput && !dateInput.value) {
      const today = new Date();
      const offset = today.getTimezoneOffset();
      const localDate = new Date(today.getTime() - offset * 60000).toISOString().slice(0, 10);
      dateInput.value = localDate;
    }
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const enteredTitle = titleInput.value.trim();
      const amount = Number(amountInput.value);
      const type = typeInput.value;
      const category = categoryInput.value.trim() || 'Other';
      const date = dateInput.value || new Date().toISOString().slice(0, 10);

      if (!Number.isFinite(amount) || amount <= 0) {
        amountInput.focus();
        return;
      }

      const title = enteredTitle || `${type === 'income' ? 'Income' : 'Expense'} - ${category}`;

      const newEntry = {
        id: Date.now(),
        title,
        amount,
        type,
        category,
        date
      };

      entries.push(newEntry);
      saveEntries();
      renderSummary();
      renderTransactions();
      resetForm();
    });
  }

  if (transactionList) {
    transactionList.addEventListener('click', function (event) {
      const button = event.target.closest('.delete-transaction');
      if (!button) return;

      const id = Number(button.dataset.id);
      entries = entries.filter((entry) => entry.id !== id);
      saveEntries();
      renderSummary();
      renderTransactions();
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', function () {
      entries = [];
      saveEntries();
      renderSummary();
      renderTransactions();
    });
  }

  resetForm();
  renderSummary();
  renderTransactions();
});
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
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
