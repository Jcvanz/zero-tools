import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdSlot from './AdSlot';

export default function ToolLayout({ tool, children, seo = {} }) {
  const { t } = useTranslation();
  const translatedName = t(`tools.${tool.id}.name`, tool.name);
  const translatedDesc = t(`tools.${tool.id}.desc`, tool.desc);
  const title = seo.title || `${translatedName} — Free Online Tool | ZeroTools`;
  const desc  = seo.desc  || translatedDesc;

  return (
    <>
      <Helmet>
        <title>{tool.name} — ZeroTools</title>
        <meta name="description" content={tool.description} />
        <meta name="keywords" content={tool.keywords} />
        <link rel="canonical" href={`https://myzerotools.online${tool.path}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": tool.name,
            "description": tool.description,
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
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
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

          {/* SEO Content Block for AdSense Approval */}
          <div className="tool-seo-content fade-up" style={{ marginTop: '48px', padding: '32px', backgroundColor: 'var(--clr-surface)', borderRadius: '16px', border: '1px solid var(--clr-border)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>{t('tool_layout.about')} {t(`tools.${tool.id}.name`, tool.name)}</h2>
            <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', marginBottom: '24px' }}>
              {t(`tools.${tool.id}.name`, tool.name)} {t('tool_layout.about_sub')}
            </p>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{t('tool_layout.privacy_title')}</h3>
            <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6' }}>
              {t('tool_layout.privacy_desc')}
            </p>
          </div>

          {/* Mid ad */}
          <AdSlot slot="In-Article 336×280" className="mt-6" />
        </div>
      </main>
    </>
  );
}
