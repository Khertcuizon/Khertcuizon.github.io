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
