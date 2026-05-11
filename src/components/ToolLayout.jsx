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

          {/* SEO Content Block for AdSense Approval */}
          <div className="tool-seo-content fade-up" style={{ marginTop: '48px', padding: '32px', backgroundColor: 'var(--clr-surface)', borderRadius: '16px', border: '1px solid var(--clr-border)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>About the {tool.name}</h2>
            <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', marginBottom: '24px' }}>
              The {tool.name} is a powerful utility designed to help you with your daily tasks. {tool.desc} It is completely free to use and requires no registration or software installation.
            </p>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>🔒 100% Privacy & Client-Side Processing</h3>
            <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6' }}>
              Unlike other online tools that upload your files to external servers, our {tool.name} operates entirely within your browser. We utilize modern web technologies (like WebAssembly and HTML5) to process everything locally on your device. This means your data is never uploaded, stored, or seen by anyone else, guaranteeing absolute privacy.
            </p>
          </div>

          {/* Mid ad */}
          <AdSlot slot="In-Article 336×280" className="mt-6" />
        </div>
      </main>
    </>
  );
}
