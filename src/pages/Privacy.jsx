import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../css/privacy.css';

export default function Privacy() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <>
      <Helmet>
        <title>{t('privacy.title')} — ZeroTools</title>
        <meta name="description" content={t('privacy.meta_desc')} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://myzerotools.online/privacy" />
      </Helmet>

      <main className="main-content" style={{padding:'60px 0 80px'}}>
        <div className="container">
          <div className="privacy-wrap">
            <Link to="/" className="back-link">{t('privacy.back')}</Link>
            <h1>{t('privacy.title')}</h1>
            <p className="updated">{t('privacy.updated', { year })}</p>

            <p dangerouslySetInnerHTML={{ __html: t('privacy.intro') }} />

            <h2>{t('privacy.title1')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p1') }} />

            <h2>{t('privacy.title2')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p2') }} />

            <h2>{t('privacy.title3')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p3') }} />

            <h2>{t('privacy.title4')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p4') }} />

            <h2>{t('privacy.title5')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p5') }} />

            <h2>{t('privacy.title6')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p6') }} />

            <h2>{t('privacy.title7')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('privacy.p7') }} />
          </div>
        </div>
      </main>
    </>
  );
}
