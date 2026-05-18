import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdSlot from './AdSlot';

export default function ToolLayout({ tool, children, seo = {} }) {
  const { t, i18n } = useTranslation();
  const translatedName = t(`tools.${tool.id}.name`, tool.name);
  const translatedDesc = t(`tools.${tool.id}.desc`, tool.desc);
  const pageTitle = seo.title || (i18n.exists(`tools.${tool.id}.seoTitle`) ? t(`tools.${tool.id}.seoTitle`) : `${translatedName} — Free Online Tool | ZeroTools`);
  const pageDesc  = seo.desc  || (i18n.exists(`tools.${tool.id}.seoDesc`)  ? t(`tools.${tool.id}.seoDesc`)  : translatedDesc);
  const keywords  = i18n.exists(`tools.${tool.id}.keywords`) ? t(`tools.${tool.id}.keywords`) : tool.keywords;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://myzerotools.online${tool.path}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://myzerotools.online${tool.path}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": translatedName,
            "description": pageDesc,
            "url": `https://myzerotools.online${tool.path}`,
            "applicationCategory": "BrowserApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <AdSlot slot="Top Leaderboard 728×90" />

      <main className="tool-page main-content">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t('header.home')}</Link>
            <span aria-hidden="true">/</span>
            <span>{t(`tools.${tool.id}.name`, tool.name)}</span>
          </nav>

          {/* Tool header */}
          <div className="tool-page-header fade-up">
            <div className="tool-header-icon" style={{background: tool.colorLight, color: tool.color}}>
              {tool.icon}
            </div>
            <h1 className="tool-title">{t(`tools.${tool.id}.name`, tool.name)}</h1>
            <p className="tool-subtitle">{t(`tools.${tool.id}.desc`, tool.desc)}</p>
          </div>

          {/* Tool content */}
          <div className="fade-up-delay">
            {children}
          </div>

          <div className="tool-seo-content fade-up" style={{ marginTop: '48px', padding: '32px', backgroundColor: 'var(--clr-surface)', borderRadius: '16px', border: '1px solid var(--clr-border)' }}>
            
            {i18n.exists(`tools.${tool.id}.article`) ? (
              <div 
                className="custom-article-content" 
                dangerouslySetInnerHTML={{ __html: t(`tools.${tool.id}.article`) }} 
              />
            ) : (
              <>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>{t('tool_layout.about')} {t(`tools.${tool.id}.name`, tool.name)}</h2>
                <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {t(`tools.${tool.id}.name`, tool.name)} {t('tool_layout.about_sub')}
                </p>
              </>
            )}

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--clr-border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{t('tool_layout.privacy_title')}</h3>
              <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6' }}>
                {t('tool_layout.privacy_desc')}
              </p>
            </div>
          </div>

          {/* Mid ad */}
          <AdSlot slot="In-Article 336×280" className="mt-6" />
        </div>
      </main>
    </>
  );
}
