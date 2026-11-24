import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const STORAGE_KEY = 'khert-budget-tracker';

const DEFAULT_ENTRIES = [
  {
    id: 1,
    title: 'Freelance Design',
    amount: 15000,
    type: 'income',
    category: 'Freelance',
    date: '2026-09-10',
  },
  {
    id: 2,
    title: 'Groceries',
    amount: 2450,
    type: 'expense',
    category: 'Food',
    date: '2026-09-12',
  },
  {
    id: 3,
    title: 'Transport Pass',
    amount: 1300,
    type: 'expense',
    category: 'Transport',
    date: '2026-09-14',
  },
  {
    id: 4,
    title: 'Side Hustle',
    amount: 7200,
    type: 'income',
    category: 'Salary',
    date: '2026-09-17',
  },
];

const CATEGORIES = [
  'Food',
  'Transport',
  'Utilities',
  'Housing',
  'Salary',
  'Freelance',
  'Savings',
  'Entertainment',
  'Education',
  'Other',
];

function getTodayLocalDate() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60000).toISOString().slice(0, 10);
}

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
    date: String(date),
  };
}

function loadEntries() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) {
      const normalized = saved.map(normalizeEntry).filter(Boolean);
      if (normalized.length) return normalized;
    }
  } catch (error) {
    console.warn('Unable to load saved budget data.', error);
  }
  return DEFAULT_ENTRIES;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(dateString) {
  if (!dateString) return 'No date';
  const date = new Date(`${dateString}T12:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function BudgetTrackerPage() {
  const [entries, setEntries] = useState(loadEntries);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(getTodayLocalDate);
  const amountInputRef = useRef(null);

  useEffect(() => {
    document.title = 'Budget Tracker — Khert Cuizon';
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.warn('Unable to save budget data.', error);
    }
  }, [entries]);

  const totals = useMemo(() => {
    const income = entries
      .filter((entry) => entry.type === 'income')
      .reduce((sum, entry) => sum + Number(entry.amount), 0);

    const expenses = entries
      .filter((entry) => entry.type === 'expense')
      .reduce((sum, entry) => sum + Number(entry.amount), 0);

    const balance = income - expenses;

    return { income, expenses, balance, totalCount: entries.length };
  }, [entries]);

  const sortedEntries = useMemo(() => {
    return entries
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [entries]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredTitle = title.trim();
    const numericAmount = Number(amount);
    const chosenCategory = category.trim() || 'Other';
    const chosenDate = date || new Date().toISOString().slice(0, 10);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      if (amountInputRef.current) amountInputRef.current.focus();
      return;
    }

    const finalTitle =
      enteredTitle ||
      `${type === 'income' ? 'Income' : 'Expense'} - ${chosenCategory}`;

    const newEntry = {
      id: Date.now(),
      title: finalTitle,
      amount: numericAmount,
      type,
      category: chosenCategory,
      date: chosenDate,
    };

    setEntries((prev) => [...prev, newEntry]);
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory('Food');
    setDate(getTodayLocalDate());
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleClearAll = () => {
    setEntries([]);
  };

  const statusText = `${totals.balance >= 0 ? 'On track' : 'Needs attention'} • ${formatCurrency(
    Math.abs(totals.balance)
  )} ${totals.balance >= 0 ? 'remaining' : 'over budget'}`;

  return (
    <Layout
      bodyClass="service-detail-page budget-page"
      showParticles={false}
      showFooter={true}
    >
      <main className="budget-main single-service">
        <div className="single-service-overlay" />
        <div className="single-service-inner">
          <Link className="service-back" to="/services">
            ← Back to Services
          </Link>

          <section className="budget-shell">
            <div className="budget-header">
              <div>
                <p className="service-kicker">Finance Tool</p>
                <h1>Budget Tracker</h1>
              </div>
              <button
                id="clearBudget"
                className="btn btn-outline budget-clear"
                type="button"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>

            <div className="budget-summary-grid">
              <article className="summary-card income-card">
                <span>Income</span>
                <strong id="incomeTotal">{formatCurrency(totals.income)}</strong>
              </article>
              <article className="summary-card expense-card">
                <span>Expenses</span>
                <strong id="expenseTotal">
                  {formatCurrency(totals.expenses)}
                </strong>
              </article>
              <article className="summary-card balance-card">
                <span>Balance</span>
                <strong
                  id="balanceTotal"
                  className={totals.balance < 0 ? 'negative' : undefined}
                >
                  {formatCurrency(totals.balance)}
                </strong>
              </article>
            </div>

            <div className="budget-status-row">
              <p id="budgetSummary">{statusText}</p>
              <span className="total-count">
                Transactions: <strong id="totalCount">{totals.totalCount}</strong>
              </span>
            </div>

            <div className="budget-layout">
              <form
                id="budgetForm"
                className="budget-form"
                onSubmit={handleSubmit}
              >
                <h2>Add transaction</h2>

                <label>
                  <span>Title</span>
                  <input
                    id="transactionTitle"
                    type="text"
                    placeholder="e.g. Grocery Shopping"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>

                <label>
                  <span>Amount</span>
                  <input
                    id="transactionAmount"
                    ref={amountInputRef}
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </label>

                <div className="form-row">
                  <label>
                    <span>Type</span>
                    <select
                      id="transactionType"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </label>

                  <label>
                    <span>Category</span>
                    <select
                      id="transactionCategory"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  <span>Date</span>
                  <input
                    id="transactionDate"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </label>

                <button className="btn btn-primary budget-submit" type="submit">
                  Add Entry
                </button>
              </form>

              <section className="transaction-panel">
                <div className="panel-header">
                  <h2>Recent activity</h2>
                </div>
                <ul
                  id="transactionList"
                  className="transaction-list"
                  aria-live="polite"
                >
                  {sortedEntries.length === 0 ? (
                    <li className="empty-state">
                      <p>No transactions yet.</p>
                      <span>
                        Add your first income or expense to begin tracking your
                        budget.
                      </span>
                    </li>
                  ) : (
                    sortedEntries.map((entry) => (
                      <li
                        key={entry.id}
                        className={`transaction-item ${
                          entry.type === 'income' ? 'income' : 'expense'
                        }`}
                      >
                        <div className="transaction-main">
                          <div className="transaction-copy">
                            <strong>{entry.title}</strong>
                            <span>
                              {entry.category} • {formatDate(entry.date)}
                            </span>
                          </div>
                          <span className="transaction-tag">
                            {entry.type === 'income' ? 'Income' : 'Expense'}
                          </span>
                        </div>
                        <div className="transaction-side">
                          <span className="transaction-amount">
                            {entry.type === 'income' ? '+' : '-'}
                            {formatCurrency(Number(entry.amount))}
                          </span>
                          <button
                            type="button"
                            className="delete-transaction"
                            aria-label={`Delete ${entry.title}`}
                            onClick={() => handleDelete(entry.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </section>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default BudgetTrackerPage;
