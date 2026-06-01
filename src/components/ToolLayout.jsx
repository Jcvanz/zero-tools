import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdSlot from './AdSlot';
import { tools } from '../data/tools';
import ToolCard from './ToolCard';
import '../css/faq.css';

const FEATURE_KEYS = ['interface', 'processing', 'options', 'unlimited', 'security'];

export default function ToolLayout({ tool, children, seo = {} }) {
  const { t, i18n } = useTranslation();
  const translatedName = t(`tools.${tool.id}.name`, tool.name);
  const translatedDesc = t(`tools.${tool.id}.desc`, tool.desc);
  const pageTitle = seo.title || (i18n.exists(`tools.${tool.id}.seoTitle`) ? t(`tools.${tool.id}.seoTitle`) : `${translatedName} — Free Online Tool | ZeroTools`);
  const pageDesc  = seo.desc  || (i18n.exists(`tools.${tool.id}.seoDesc`)  ? t(`tools.${tool.id}.seoDesc`)  : translatedDesc);
  const keywords  = i18n.exists(`tools.${tool.id}.keywords`) ? t(`tools.${tool.id}.keywords`) : tool.keywords;

  const toolFaqs = i18n.exists(`tools.${tool.id}.faq`)
    ? t(`tools.${tool.id}.faq`, { returnObjects: true })
    : [];
  const hasFeatures = i18n.exists(`tools.${tool.id}.features`);

  const categoryTools = tools.filter(tItem => tItem.category === tool.category && tItem.id !== tool.id);
  let recommendedTools = [];
  let recommendationTitleKey = '';

  if (categoryTools.length >= 2) {
    recommendedTools = categoryTools;
    recommendationTitleKey = 'tool_layout.related_tools';
  } else {
    recommendationTitleKey = 'tool_layout.other_tools';
    const baseList = [...categoryTools];
    const padding = tools.filter(tItem => tItem.id !== tool.id && !baseList.some(b => b.id === tItem.id));
    recommendedTools = [...baseList, ...padding].slice(0, 3);
  }

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

          {/* Recommendations Component */}
          {recommendedTools.length > 0 && (
            <section className="tool-suggestions-section fade-up">
              <h2>{t(recommendationTitleKey)}</h2>
              <div className="tools-grid">
                {recommendedTools.map((tItem) => (
                  <div key={tItem.id} className="tool-grid-card">
                    <ToolCard tool={tItem} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SEO Content Block */}
          <div className="tool-seo-content fade-up" style={{ marginTop: '48px', padding: '32px', backgroundColor: 'var(--clr-surface)', borderRadius: '16px', border: '1px solid var(--clr-border)' }}>

            {/* Section 1: What is this tool */}
            {i18n.exists(`tools.${tool.id}.whatIs`) && (
              <div className="tool-article-section">
                <h2>{t('tool_layout.what_is')} {translatedName}?</h2>
                <p>{t(`tools.${tool.id}.whatIs`)}</p>
              </div>
            )}

            {/* Section 2: How it works (existing article) */}
            {i18n.exists(`tools.${tool.id}.article`) ? (
              <div
                className="tool-article-section custom-article-content"
                dangerouslySetInnerHTML={{ __html: t(`tools.${tool.id}.article`) }}
              />
            ) : (
              <div className="tool-article-section">
                <h2>{t('tool_layout.about')} {translatedName}</h2>
                <p>{translatedName} {t('tool_layout.about_sub')}</p>
              </div>
            )}

            {/* Section 3: Key Features */}
            {hasFeatures && (
              <div className="tool-article-section tool-features-section">
                <h2>{t('tool_layout.features_title')} {translatedName}</h2>
                <div className="tool-features-grid">
                  {FEATURE_KEYS.map(key => (
                    i18n.exists(`tools.${tool.id}.features.${key}`) && (
                      <div key={key} className="tool-feature-item">
                        <h3>{t(`tool_layout.feat_${key}`)}</h3>
                        <p>{t(`tools.${tool.id}.features.${key}`)}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Privacy */}
            <div className="tool-article-section" style={{ paddingTop: '24px', borderTop: '1px solid var(--clr-border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{t('tool_layout.privacy_title')}</h3>
              <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6' }}>
                {t('tool_layout.privacy_desc')}
              </p>
            </div>

            {/* Section 4: Tool-specific FAQ */}
            {Array.isArray(toolFaqs) && toolFaqs.length > 0 && (
              <div className="tool-article-section tool-faq-section" style={{ paddingTop: '24px', borderTop: '1px solid var(--clr-border)' }}>
                <h2>{t('tool_layout.faq_title')} {translatedName}</h2>
                <div className="tool-faq-list">
                  {toolFaqs.map((f, i) => (
                    <details key={i} className="faq-item">
                      <summary className="faq-q">{f.q}</summary>
                      <div className="faq-a"><p>{f.a}</p></div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FAQ Schema for rich snippets */}
          {Array.isArray(toolFaqs) && toolFaqs.length > 0 && (
            <Helmet>
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": toolFaqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": f.a
                    }
                  }))
                })}
              </script>
            </Helmet>
          )}

          {/* Mid ad */}
          <AdSlot slot="In-Article 336×280" className="mt-6" />
        </div>
      </main>
    </>
  );
}
