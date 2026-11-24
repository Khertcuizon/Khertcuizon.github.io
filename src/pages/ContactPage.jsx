import React, { useEffect, useState } from 'react';
import { getAssetUrl } from '../utils/assets';
import Layout from '../components/Layout';
import RevealUp from '../components/RevealUp';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    document.title = 'Contact — Khert Cuizon';
  }, []);

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(''), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Message sent — thanks for reaching out! I'll reply soon.");
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Layout bodyClass="page-contact multi-page">
      <section className="section contact-section" id="contact">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url('${getAssetUrl('contact.jpg')}')` }}
        />
        <div className="overlay" />
        <div className="section-inner contact-inner">
          <RevealUp className="glass-panel contact-panel">
            <div className="contact-grid">
              <div className="contact-info">
                <span className="eyebrow">Contact</span>
                <h2 className="section-title">Let&apos;s build something.</h2>
                <p className="contact-desc">
                  Open to internships, group projects, and freelance work. Reach
                  out — I reply fast.
                </p>
                <ul className="contact-list">
                  <li>
                    <span className="ci-icon">📸</span>{' '}
                    <a
                      href="https://www.instagram.com/_cuizon29?stkn=MW1yNzFjMjl4Mm9i"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      @_cuizon29
                    </a>
                  </li>
                  <li>
                    <span className="ci-icon">📱</span> 09871525700
                  </li>
                  <li>
                    <span className="ci-icon">📍</span> Philippines
                  </li>
                </ul>
              </div>

              <form
                action="#"
                className="contact-form"
                id="contactForm"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <input
                    id="name"
                    name="name"
                    placeholder=" "
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-group">
                  <input
                    id="email"
                    name="email"
                    placeholder=" "
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    placeholder=" "
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <label htmlFor="message">Message</label>
                </div>
                <button className="btn btn-glow submit-btn" type="submit">
                  <span>Send Message</span>
                </button>
                <p className="form-status" id="formStatus">
                  {status}
                </p>
              </form>
            </div>
          </RevealUp>
        </div>
      </section>
    </Layout>
  );
}

export default ContactPage;
