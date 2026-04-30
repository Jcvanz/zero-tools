import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AdSlot from './AdSlot';

export default function ToolLayout({ tool, children, seo = {} }) {
  const title = seo.title || `${tool.name} — Free Online Tool | ZeroTools`;
  const desc  = seo.desc  || tool.desc;

  return (
    <>
      <Helmet>
        <title>{tool.name} — ZeroTools</title>
        <meta name="description" content={tool.description} />
        <meta name="keywords" content={tool.keywords.join(', ')} />
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
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{tool.name}</span>
          </nav>

          {/* Tool header */}
          <div className="tool-page-header fade-up">
            <div
              className="tool-page-icon"
              style={{ background: tool.colorLight, color: tool.color }}
              aria-hidden="true"
            >
              {tool.icon}
            </div>
            <h1 className="tool-page-title">{tool.name}</h1>
            <p className="tool-page-desc">{tool.desc}</p>
          </div>

          {/* Tool content */}
          <div className="fade-up-delay">
            {children}
          </div>

          {/* Mid ad */}
          <AdSlot slot="In-Article 336×280" className="mt-6" />
        </div>
      </main>

      <style>{`
        .breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: .85rem; color: var(--clr-text-3);
          margin-bottom: 28px;
        }
        .breadcrumb a { color: var(--clr-text-3); }
        .breadcrumb a:hover { color: var(--clr-brand); }
        .mt-6 { margin-top: 24px; }
      `}</style>
    </>
  );
}
