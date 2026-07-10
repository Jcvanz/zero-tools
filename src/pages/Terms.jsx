import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../css/privacy.css'; 

const SECTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function Terms() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <>
      <Helmet>
        <title>{t('terms.title')} — ZeroTools</title>
        <meta name="description" content={t('terms.meta_desc')} />
        <link rel="canonical" href="https://myzerotools.online/terms" />
        <meta property="og:title" content={`${t('terms.title')} — ZeroTools`} />
        <meta property="og:description" content={t('terms.meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myzerotools.online/terms" />
      </Helmet>

      <main className="main-content" style={{padding:'60px 0 80px'}}>
        <div className="container">
          <article className="privacy-wrap">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">{t('header.home')}</Link>
              <span aria-hidden="true">/</span>
              <span>{t('terms.title')}</span>
            </nav>

            <h1>{t('terms.title')}</h1>
            <p className="updated">{t('terms.updated', { year })}</p>

            <p dangerouslySetInnerHTML={{ __html: t('terms.intro') }} />

            {SECTIONS.map(n => {
              const titleKey = `terms.title${n}`;
              const pKey = `terms.p${n}`;
              if (!i18n.exists(titleKey)) return null;
              return (
                <section key={n}>
                  <h2>{t(titleKey)}</h2>
                  <p dangerouslySetInnerHTML={{ __html: t(pKey) }} />
                </section>
              );
            })}
          </article>
        </div>
      </main>
    </>
  );
}
