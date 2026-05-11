import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { tools } from '../data/tools';
import '../css/header.css';

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
    </header>
  );
}
