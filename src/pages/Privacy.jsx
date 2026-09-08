import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../css/privacy.css';

const SECTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <>
      <Helmet>
        <title>{t('privacy.title')} — ZeroTools</title>
        <meta name="description" content={t('privacy.meta_desc')} />
        <link rel="canonical" href="https://myzerotools.online/privacy" />
        <meta property="og:title" content={`${t('privacy.title')} — ZeroTools`} />
        <meta property="og:description" content={t('privacy.meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myzerotools.online/privacy" />
      </Helmet>

      <main className="main-content" style={{padding:'60px 0 80px'}}>
        <div className="container">
          <article className="privacy-wrap">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">{t('header.home')}</Link>
              <span aria-hidden="true">/</span>
              <span>{t('header.privacy', 'Privacidade')}</span>
            </nav>

            <h1>{t('privacy.title')}</h1>
            <p className="updated">{t('privacy.updated', { year })}</p>

            <p dangerouslySetInnerHTML={{ __html: t('privacy.intro') }} />

            {SECTIONS.map(n => {
              const titleKey = `privacy.title${n}`;
              const pKey = `privacy.p${n}`;
              const titleKeyB = `privacy.title${n}b`;
              const pKeyB = `privacy.p${n}b`;
              if (!i18n.exists(titleKey)) return null;
              return (
                <section key={n}>
                  <h2>{t(titleKey)}</h2>
                  <p dangerouslySetInnerHTML={{ __html: t(pKey) }} />
                  {i18n.exists(titleKeyB) && (
                    <div className="privacy-sub">
                      <h3>{t(titleKeyB)}</h3>
                      <p dangerouslySetInnerHTML={{ __html: t(pKeyB) }} />
                    </div>
                  )}
                </section>
              );
            })}
          </article>
        </div>
      </main>
    </>
  );
}

