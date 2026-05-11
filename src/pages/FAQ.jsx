import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdSlot from '../components/AdSlot';
import '../css/faq.css';

export default function FAQ() {
  const { t } = useTranslation();
  const faqs = t('faq_page.faqs', { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t('faq_page.title')} | ZeroTools</title>
        <meta name="description" content={t('faq_page.meta_desc')} />
        <link rel="canonical" href="https://myzerotools.online/faq" />
      </Helmet>

      <AdSlot slot="Top Leaderboard" />

      <main className="main-content tool-page">
        <div className="container">
          <div style={{maxWidth:760, margin:'0 auto'}}>
            <nav className="breadcrumb"><Link to="/">{t('header.home')}</Link><span>/</span><span>{t('header.faq')}</span></nav>
            <h1 className="tool-page-title">{t('faq_page.title')}</h1>
            <p className="tool-page-desc" style={{marginBottom:40}}>{t('faq_page.desc')}</p>

            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {Array.isArray(faqs) && faqs.map((f, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-q">{f.q}</summary>
                  <div className="faq-a"><p>{f.a}</p></div>
                </details>
              ))}
            </div>

            <div style={{marginTop:48,padding:32,background:'var(--clr-brand-lt)',borderRadius:24,textAlign:'center',border:'1px solid #c7d2fe'}}>
              <h2 style={{fontSize:'1.25rem',marginBottom:8}}>{t('faq_page.still')}</h2>
              <p style={{color:'var(--clr-text-2)',marginBottom:20}}>{t('faq_page.still_desc')}</p>
              <a href="mailto:HelloZeroTools@outlook.com" className="btn btn-primary">{t('faq_page.contact')}</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
