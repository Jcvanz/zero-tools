import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../css/contact.css';

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setLoading(true);
    setError(false);

    const FORMSPREE_FORM_ID = "xeebywaa"; 

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject: t(`contact.subjects.${subject}`, subject),
          message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setSubject('suggestion');
        setMessage('');
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
    
    setTimeout(() => {
      setSubmitted(false);
      setError(false);
    }, 5000);
  };

  const infoItems = t('contact.info_items', { returnObjects: true }) || [];

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} — ZeroTools</title>
        <meta name="description" content={t('contact.meta_desc')} />
        <link rel="canonical" href="https://myzerotools.online/contact" />
        <meta property="og:title" content={`${t('contact.title')} — ZeroTools`} />
        <meta property="og:description" content={t('contact.meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myzerotools.online/contact" />
      </Helmet>

      <main className="main-content contact-page" style={{padding:'60px 0 80px'}}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t('header.home')}</Link>
            <span aria-hidden="true">/</span>
            <span>{t('contact.title')}</span>
          </nav>

          <div className="contact-header">
            <h1>{t('contact.heading')}</h1>
            <p className="contact-subtitle">{t('contact.desc')}</p>
          </div>

          <div className="contact-grid">
            {/* Info Col */}
            <div className="contact-info-col">
              <div className="info-card">
                <h3>{t('contact.email_title')}</h3>
                <p>{t('contact.email_desc')}</p>
                <div className="email-highlight">
                  <span>{t('contact.email_label')}</span>
                  <a href="mailto:HelloZeroTools@outlook.com" className="email-link">HelloZeroTools@outlook.com</a>
                </div>
                <div className="response-badge">
                  {t('contact.response_time')}
                </div>
              </div>

              <div className="info-card useful-info">
                <h3>{t('contact.info_title')}</h3>
                <ul>
                  {infoItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form Col */}
            <div className="contact-form-col">
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>{t('contact.form_title')}</h2>
                <p className="form-desc">{t('contact.form_desc')}</p>

                 {submitted && (
                  <div className="form-success-alert">
                    {t('contact.form_success')}
                  </div>
                )}

                {error && (
                  <div className="form-error-alert" style={{color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', padding: '14px', borderRadius: '10px', marginBottom: '24px', fontSize: '0.95rem'}}>
                    Ocorreu um erro ao enviar sua mensagem. Por favor, tente enviar novamente ou diretamente para HelloZeroTools@outlook.com.
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="contact-name">{t('contact.form_name')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">{t('contact.form_email')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">{t('contact.form_subject')}</label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="suggestion">{t('contact.subjects.suggestion')}</option>
                    <option value="bug">{t('contact.subjects.bug')}</option>
                    <option value="question">{t('contact.subjects.question')}</option>
                    <option value="partnership">{t('contact.subjects.partnership')}</option>
                    <option value="other">{t('contact.subjects.other')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">{t('contact.form_message')}</label>
                  <textarea
                    id="contact-message"
                    required
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                  />
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Enviando...' : t('contact.form_send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
