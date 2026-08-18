import { useState } from 'react';
import headshot from '../assets/images/headshot.png';

const BOOKING_URL = 'mailto:draganbjelica12@gmail.com?subject=15-min%20call';

const WEB3FORMS_ACCESS_KEY = 'a4626b66-fc06-43dc-9e0a-3d4742a61d85';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus('error');
      return;
    }
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New message from portfolio contact form',
          from_name: 'Portfolio Contact Form',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="wrap contact__inner">
        <img src={headshot} alt="Dragan Bjelica" className="contact__photo" />
        <div className="contact__body">
          <p className="eyebrow">contact</p>
          <h2 className="contact__headline">
            If you're scaling a backend system and want a second set of eyes on
            architecture — let's talk.
          </h2>
          <div className="contact__actions">
            <a href={BOOKING_URL} className="contact__cta">Book a 15-min call</a>
            <a href="mailto:draganbjelica12@gmail.com" className="contact__secondary">
              draganbjelica12@gmail.com
            </a>
            <a
              href="https://github.com/draganb24"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__secondary"
            >
              github.com/draganb24
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <p className="eyebrow contact-form__eyebrow">or send a message</p>

            <div className="contact-form__row">
              <label className="field-label" htmlFor="name">name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                className="contact-form__input"
                placeholder="Your name"
              />
            </div>

            <div className="contact-form__row">
              <label className="field-label" htmlFor="email">email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="contact-form__input"
                placeholder="you@company.com"
              />
            </div>

            <div className="contact-form__row">
              <label className="field-label" htmlFor="message">message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                className="contact-form__input contact-form__textarea"
                placeholder="What are you working on?"
              />
            </div>

            {/* Honeypot: hidden from humans, bots that fill it get flagged as spam. */}
            <input
              type="checkbox"
              name="botcheck"
              className="contact-form__honeypot"
              tabIndex={-1}
              aria-hidden="true"
            />

            <button type="submit" className="contact-form__submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'success' && (
              <p className="contact-form__status contact-form__status--ok" role="status">
                Thanks — your message is on its way to my inbox.
              </p>
            )}
            {status === 'error' && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY' && (
              <p className="contact-form__status contact-form__status--err" role="alert">
                Something went wrong sending the message. Please email me directly at
                draganbjelica12@gmail.com.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
