import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { tools } from '../data/tools';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setToolsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="logo" aria-label="ZeroTools Home">
            <div className="logo-icon" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <rect width="30" height="30" rx="9" fill="url(#hg)"/>
                <rect x="7" y="9" width="16" height="3" rx="1.5" fill="white"/>
                <rect x="7" y="14" width="10" height="3" rx="1.5" fill="white" opacity=".8"/>
                <rect x="7" y="19" width="13" height="3" rx="1.5" fill="white" opacity=".6"/>
                <defs>
                  <linearGradient id="hg" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1"/>
                    <stop offset="1" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">Zero<strong>Tools</strong></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main navigation" ref={menuRef}>
            <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>
              Home
            </NavLink>

            <div className="nav-dropdown">
              <button
                className={`nav-link nav-dropdown-trigger${toolsOpen ? ' active' : ''}`}
                onClick={() => setToolsOpen(o => !o)}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
              >
                Tools
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{transform: toolsOpen ? 'rotate(180deg)' : '', transition: 'transform 200ms'}}>
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {toolsOpen && (
                <div className="dropdown-menu" role="menu">
                  <div className="dropdown-grid">
                    {tools.map(tool => (
                      <Link key={tool.id} to={tool.path} className="dropdown-item" role="menuitem">
                        <span className="dropdown-item-icon" style={{background: tool.colorLight, color: tool.color}}>
                          {tool.icon}
                        </span>
                        <span className="dropdown-item-text">
                          <span className="dropdown-item-name">{tool.name}</span>
                          <span className="dropdown-item-cat">{tool.category}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/faq" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              FAQ
            </NavLink>
          </nav>

          {/* Mobile burger */}
          <button
            className="burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`burger-line${menuOpen ? ' open' : ''}`}/>
            <span className={`burger-line${menuOpen ? ' open' : ''}`}/>
            <span className={`burger-line${menuOpen ? ' open' : ''}`}/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" role="navigation" aria-label="Mobile navigation">
          <div className="container">
            <NavLink to="/" className="mobile-link" end>Home</NavLink>
            <div className="mobile-divider">Tools</div>
            {tools.map(tool => (
              <Link key={tool.id} to={tool.path} className="mobile-tool-link">
                <span className="mobile-tool-icon" style={{background: tool.colorLight, color: tool.color}}>
                  {tool.icon}
                </span>
                <span>{tool.name}</span>
              </Link>
            ))}
            <div className="mobile-divider"/>
            <NavLink to="/faq" className="mobile-link">FAQ</NavLink>
            <NavLink to="/privacy" className="mobile-link">Privacy</NavLink>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid transparent;
          position: sticky; top: 0; z-index: 100;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .site-header.scrolled {
          border-color: var(--clr-border);
          box-shadow: 0 2px 16px rgba(0,0,0,.06);
        }
        .header-inner {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-block: 14px;
          gap: 16px;
        }
        .logo {
          display: flex; align-items: center; gap: 10px;
          color: var(--clr-text-1); text-decoration: none; flex-shrink: 0;
        }
        .logo-text { font-size: 1.125rem; font-weight: 600; letter-spacing: -.02em; }
        .logo-text strong { color: var(--clr-brand); font-weight: 800; }
        .logo-icon { display: flex; }

        .desktop-nav { display: flex; align-items: center; gap: 4px; }
        .nav-link {
          display: flex; align-items: center; gap: 4px;
          padding: 6px 12px;
          border-radius: var(--radius-md);
          font-size: .9rem; font-weight: 500;
          color: var(--clr-text-2);
          transition: color var(--t-fast), background var(--t-fast);
          background: none; border: none; cursor: pointer;
        }
        .nav-link:hover, .nav-link.active { color: var(--clr-brand); background: var(--clr-brand-lt); }

        /* Dropdown */
        .nav-dropdown { position: relative; }
        .nav-dropdown-trigger { font-family: var(--font); }
        .dropdown-menu {
          position: absolute; top: calc(100% + 10px); left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 1px solid var(--clr-border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          padding: 16px;
          min-width: 700px;
          animation: fadeUp .2s ease both;
        }
        .dropdown-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          color: var(--clr-text-1);
          transition: background var(--t-fast);
        }
        .dropdown-item:hover { background: var(--clr-bg); }
        .dropdown-item-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          font-size: .875rem; font-weight: 700;
        }
        .dropdown-item-text { display: flex; flex-direction: column; gap: 1px; }
        .dropdown-item-name { font-size: .875rem; font-weight: 600; }
        .dropdown-item-cat { font-size: .75rem; color: var(--clr-text-3); }

        /* Burger */
        .burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px; height: 40px;
          background: none; border: none; cursor: pointer;
          border-radius: var(--radius-md);
          padding: 6px;
        }
        .burger:hover { background: var(--clr-bg); }
        .burger-line {
          display: block;
          width: 22px; height: 2px;
          background: var(--clr-text-1);
          border-radius: 2px;
          transition: transform 250ms, opacity 200ms;
          transform-origin: center;
        }
        .burger-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .burger-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .burger-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          border-top: 1px solid var(--clr-border);
          background: white;
          padding-block: 16px 24px;
          max-height: calc(100vh - 64px);
          overflow-y: auto;
        }
        .mobile-link {
          display: block; padding: 10px 4px;
          font-size: .95rem; font-weight: 500;
          color: var(--clr-text-2); border: none; background: none;
          transition: color var(--t-fast);
        }
        .mobile-link:hover, .mobile-link.active { color: var(--clr-brand); }
        .mobile-divider {
          font-size: .7rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: var(--clr-text-3);
          padding: 16px 4px 6px;
        }
        .mobile-tool-link {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 4px; color: var(--clr-text-1);
          font-size: .9rem; font-weight: 500;
          transition: color var(--t-fast);
        }
        .mobile-tool-link:hover { color: var(--clr-brand); }
        .mobile-tool-icon {
          width: 30px; height: 30px; flex-shrink: 0;
          border-radius: 6px; display: flex; align-items: center;
          justify-content: center; font-size: .8rem; font-weight: 700;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .burger { display: flex; }
        }
      `}</style>
    </header>
  );
}
