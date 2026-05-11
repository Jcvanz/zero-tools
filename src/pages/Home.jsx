import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { tools, categories } from '../data/tools';
import ToolCard from '../components/ToolCard';
import AdSlot from '../components/AdSlot';
import '../css/home.css';

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
        <title>ZeroTools — Free Online Tools</title>
        <meta name="description" content="Free online tools: QR code generator, hashtag generator, image compressor, background remover, PDF compressor and more. No signup required — works entirely in your browser." />
        <meta name="keywords" content="free online tools, qr code generator, hashtag generator, image compressor, background remover, pdf compressor, password generator" />
        <link rel="canonical" href="https://myzerotools.online/" />
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
              { value: '1.2M+', label: 'Files Processed' },
              { value: '13', label: 'Pro Tools' },
              { value: '0 bytes', label: 'Data Stored' },
              { value: '100%', label: 'Free Forever' },
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
                <div key={tool.id} style={{ animationDelay: `${i * 40}ms` }} className="fade-up tool-grid-card">
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
    </>
  );
}
