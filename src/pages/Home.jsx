import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { tools, categories } from '../data/tools';
import ToolCard from '../components/ToolCard';
import AdSlot from '../components/AdSlot';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = tools.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>ZeroTools — Free Online Tools: QR Code, Hashtag Generator, Image Compressor & More</title>
        <meta name="description" content="Free online tools: QR code generator, hashtag generator, image compressor, background remover, PDF compressor and more. No signup required — works entirely in your browser." />
        <meta name="keywords" content="free online tools, qr code generator, hashtag generator, image compressor, background remover, pdf compressor, password generator" />
        <link rel="canonical" href="https://zerotools.app/" />
        <meta property="og:title" content="ZeroTools — Free Online Tools" />
        <meta property="og:description" content="13 free browser-based tools for creators, developers and marketers." />
        <meta property="og:type" content="website" />
      </Helmet>

      <AdSlot slot="Top Leaderboard 728×90" />

      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <span>✨</span> 13 Free Tools · No Signup · No Upload
          </div>
          <h1 className="hero-title">
            The Free Toolbox for<br />
            <span className="gradient-text">Creators &amp; Developers</span>
          </h1>
          <p className="hero-sub">
            QR Codes, Hashtag Generators, Image Compressors, Background Removers and more —
            all running 100% in your browser. Zero data leaves your device.
          </p>

          {/* Search */}
          <div className="hero-search">
            <div className="search-box">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="5.5" stroke="#9ca3af" strokeWidth="1.8"/>
                <path d="M12.5 12.5l3 3" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <input
                type="search"
                placeholder="Search tools…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input"
                aria-label="Search tools"
                id="tool-search"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="main-content">
        <div className="container">
          {/* Stats */}
          <div className="stats-row">
            {[
              { value: '13', label: 'Free Tools' },
              { value: '0', label: 'Data Uploaded' },
              { value: '100%', label: 'In-Browser' },
              { value: '∞', label: 'Uses per Day' },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Category pills */}
          <div className="category-row" role="tablist" aria-label="Filter tools by category">
            {categories.map(cat => (
              <button
                key={cat}
                className={`pill-tab${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tools grid */}
          {filtered.length > 0 ? (
            <div className="tools-grid" role="tabpanel">
              {filtered.map((tool, i) => (
                <div key={tool.id} style={{ animationDelay: `${i * 40}ms` }} className="fade-up">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No tools found for "<strong>{search}</strong>"</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
                Clear filters
              </button>
            </div>
          )}

          <AdSlot slot="Content Break — Responsive" />

          {/* Why ZeroTools */}
          <section className="why-section" aria-labelledby="why-heading">
            <h2 className="section-title" id="why-heading">Why ZeroTools?</h2>
            <p className="section-sub">Built differently from other tool sites</p>
            <div className="why-grid">
              {[
                { icon: '🔒', title: '100% Private', desc: 'Your files never leave your device. All processing happens locally in your browser using modern Web APIs.' },
                { icon: '⚡', title: 'Instant Results', desc: 'No server roundtrips. No waiting in queues. Tools run at full speed directly on your machine.' },
                { icon: '🆓', title: 'Always Free', desc: 'Every tool is completely free to use, forever. No account, no credit card, no hidden limits.' },
                { icon: '📱', title: 'Works Everywhere', desc: 'Fully responsive design. Use ZeroTools on desktop, tablet, or mobile — anywhere, anytime.' },
              ].map(f => (
                <article key={f.title} className="why-card">
                  <div className="why-icon" aria-hidden="true">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Popular tools CTA */}
          <section className="cta-section" aria-labelledby="popular-heading">
            <h2 className="section-title" id="popular-heading">Most Popular Tools</h2>
            <div className="popular-grid">
              {tools.slice(0, 3).map(tool => (
                <Link key={tool.id} to={tool.path} className="popular-card" style={{'--accent': tool.color, '--accent-lt': tool.colorLight}}>
                  <span className="popular-icon" style={{background: tool.colorLight, color: tool.color}}>{tool.icon}</span>
                  <span className="popular-name">{tool.name}</span>
                  <span className="popular-arrow">→</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <style>{`
        /* Hero */
        .hero-section {
          padding: 72px 0 48px;
          text-align: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 16px;
          background: var(--clr-brand-lt);
          border: 1px solid #c7d2fe;
          border-radius: var(--radius-full);
          font-size: .8rem; font-weight: 600; color: #4338ca;
          margin-bottom: 24px;
        }
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: var(--clr-text-2);
          max-width: 580px;
          margin: 0 auto 36px;
          line-height: 1.7;
        }
        .hero-search { max-width: 480px; margin: 0 auto; }
        .search-box {
          position: relative; display: flex; align-items: center;
        }
        .search-icon { position: absolute; left: 14px; pointer-events: none; }
        .search-input {
          width: 100%; padding: 12px 16px 12px 42px;
          border: 2px solid var(--clr-border);
          border-radius: var(--radius-full);
          font-size: 1rem; font-family: var(--font);
          outline: none; background: white;
          transition: border-color var(--t-base), box-shadow var(--t-base);
        }
        .search-input:focus {
          border-color: var(--clr-brand);
          box-shadow: 0 0 0 3px rgba(99,102,241,.12);
        }

        /* Stats */
        .stats-row {
          display: flex; justify-content: center; gap: 0;
          background: white; border: 1px solid var(--clr-border);
          border-radius: var(--radius-xl); overflow: hidden;
          margin-bottom: 40px;
          box-shadow: var(--shadow-sm);
        }
        .stat-item {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; padding: 20px 16px;
          border-right: 1px solid var(--clr-border);
        }
        .stat-item:last-child { border-right: none; }
        .stat-value { font-size: 1.75rem; font-weight: 800; color: var(--clr-brand); letter-spacing: -0.03em; }
        .stat-label { font-size: .75rem; color: var(--clr-text-3); font-weight: 500; }

        /* Categories */
        .category-row {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: 28px;
        }

        /* Tools grid */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          margin-bottom: 48px;
        }

        .no-results {
          text-align: center; padding: 48px;
          color: var(--clr-text-2);
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }

        /* Why */
        .why-section { padding-block: 64px; }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .why-card {
          background: white;
          border: 1px solid var(--clr-border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          transition: transform var(--t-base), box-shadow var(--t-base);
        }
        .why-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .why-icon { font-size: 2rem; margin-bottom: 16px; }
        .why-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
        .why-card p { font-size: .875rem; color: var(--clr-text-2); line-height: 1.65; }

        /* Popular */
        .cta-section { padding-bottom: 64px; }
        .popular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .popular-card {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 20px;
          background: white;
          border: 1px solid var(--clr-border);
          border-radius: var(--radius-lg);
          color: var(--clr-text-1);
          font-weight: 600;
          transition: transform var(--t-base), box-shadow var(--t-base), border-color var(--t-base);
        }
        .popular-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent, var(--clr-brand));
          color: var(--clr-text-1);
        }
        .popular-icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem; font-weight: 800;
          flex-shrink: 0;
        }
        .popular-name { flex: 1; font-size: .9rem; }
        .popular-arrow { color: var(--clr-text-3); }
        .popular-card:hover .popular-arrow { color: var(--accent, var(--clr-brand)); }

        @media (max-width: 640px) {
          .stats-row { flex-wrap: wrap; }
          .stat-item { min-width: 50%; border-bottom: 1px solid var(--clr-border); }
          .stat-item:nth-child(even) { border-right: none; }
        }
      `}</style>
    </>
  );
}
