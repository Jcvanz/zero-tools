import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot';

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('about.title', 'About Us')} — ZeroTools</title>
        <meta name="description" content={t('about.meta_desc', 'Learn more about ZeroTools, our mission, and our commitment to 100% private, client-side web tools.')} />
        <link rel="canonical" href="https://myzerotools.online/about" />
        <meta property="og:title" content={`${t('about.title', 'About Us')} — ZeroTools`} />
        <meta property="og:description" content={t('about.meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myzerotools.online/about" />
        <meta property="og:image" content="https://myzerotools.online/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="ZeroTools" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('about.title', 'About Us')} — ZeroTools`} />
        <meta name="twitter:description" content={t('about.meta_desc')} />
        <meta name="twitter:image" content="https://myzerotools.online/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": t('about.title', 'About ZeroTools'),
            "url": "https://myzerotools.online/about",
            "description": t('about.meta_desc'),
            "publisher": {
              "@type": "Organization",
              "name": "ZeroTools",
              "url": "https://myzerotools.online",
              "logo": "https://myzerotools.online/favicon.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "HelloZeroTools@outlook.com",
                "contactType": "customer support"
              }
            }
          })}
        </script>
      </Helmet>


      <main className="tool-page main-content">
        <div className="container" style={{maxWidth: '800px', margin: '0 auto'}}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t('header.home')}</Link>
            <span aria-hidden="true">/</span>
            <span>{t('header.about', 'About Us')}</span>
          </nav>

          <h1 style={{fontSize: '2.5rem', marginBottom: '24px'}}>{t('about.title', 'About ZeroTools')}</h1>

          <article className="card" style={{padding: '32px', marginBottom: '32px', lineHeight: '1.8'}}>
            <section>
              <h2 style={{marginBottom: '16px', color: 'var(--clr-brand)'}}>{t('about.mission_title', 'Our Mission')}</h2>
              <p style={{marginBottom: '24px', color: 'var(--clr-text-2)'}}>
                {t('about.mission_desc')}
              </p>
            </section>

            <section>
              <h2 style={{marginBottom: '16px', color: 'var(--clr-brand)'}}>{t('about.history_title', 'Our Story')}</h2>
              <p style={{marginBottom: '24px', color: 'var(--clr-text-2)'}}>
                {t('about.history_desc')}
              </p>
            </section>

            <section>
              <h2 style={{marginBottom: '16px', color: 'var(--clr-brand)'}}>{t('about.privacy_title', '100% Client-Side Processing')}</h2>
              <p style={{marginBottom: '24px', color: 'var(--clr-text-2)'}}>
                {t('about.privacy_desc')}
              </p>
            </section>

            <section>
              <h2 style={{marginBottom: '16px', color: 'var(--clr-brand)'}}>{t('about.tech_title', 'Our Technology')}</h2>
              <p style={{marginBottom: '24px', color: 'var(--clr-text-2)'}}>
                {t('about.tech_desc')}
              </p>
            </section>

            <section>
              <h2 style={{marginBottom: '16px', color: 'var(--clr-brand)'}}>{t('about.free_title', 'Free for Everyone')}</h2>
              <p style={{marginBottom: '24px', color: 'var(--clr-text-2)'}}>
                {t('about.free_desc')}
              </p>
            </section>

            <section>
              <h2 style={{marginBottom: '16px', color: 'var(--clr-brand)'}}>{t('about.contact_title', 'Get in Touch')}</h2>
              <p style={{color: 'var(--clr-text-2)'}}>
                {t('about.contact_desc')} <a href="mailto:HelloZeroTools@outlook.com" style={{color: 'var(--clr-brand)', fontWeight: 'bold'}}>HelloZeroTools@outlook.com</a>.
              </p>
            </section>
          </article>

          <AdSlot slot="In-Article Banner" />
        </div>
      </main>
    </>
  );
}

