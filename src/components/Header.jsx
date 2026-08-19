import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { tools } from '../data/tools';
import '../css/header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const [prevLocation, setPrevLocation] = useState(location.pathname);
  if (prevLocation !== location.pathname) {
    setPrevLocation(location.pathname);
    setMenuOpen(false);
    setToolsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setToolsOpen(false);
        setLangOpen(false);
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
              {t('header.home')}
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
                          <span className="dropdown-item-name">{t(`tools.${tool.id}.name`, tool.name)}</span>
                          <span className="dropdown-item-cat">{t(`home.categories.${tool.category}`, tool.category)}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/blog" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('blog.title', 'Blog')}
            </NavLink>

            <NavLink to="/contact" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('contact.title', 'Contact')}
            </NavLink>

            <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('header.about', 'About Us')}
            </NavLink>

            <NavLink to="/faq" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('header.faq')}
            </NavLink>

            {/* Language Switcher */}
            <div className="nav-dropdown" style={{marginLeft: '12px'}}>
              <button
                className={`nav-link nav-dropdown-trigger${langOpen ? ' active' : ''}`}
                onClick={() => setLangOpen(o => !o)}
                aria-expanded={langOpen}
                aria-label="Change Language"
                style={{padding: '6px 12px', background: 'var(--clr-surface)', borderRadius: '8px', border: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center'}}
              >
                <img 
                  src={`https://flagcdn.com/${i18n.language.startsWith('pt') ? 'br' : i18n.language.startsWith('es') ? 'es' : 'us'}.svg`} 
                  width="20" 
                  alt="Language"
                  style={{borderRadius: '2px', display: 'block'}}
                />
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{transform: langOpen ? 'rotate(180deg)' : '', transition: 'transform 200ms', marginLeft: '8px'}}>
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {langOpen && (
                <div className="dropdown-menu" style={{width: '130px', minWidth: '130px', right: 0, left: 'auto', padding: '8px'}}>
                  <button className="dropdown-item" onClick={() => { i18n.changeLanguage('en'); setLangOpen(false); }} style={{width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--clr-text-1)', padding: '8px', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <img src="https://flagcdn.com/us.svg" width="18" alt="US" style={{borderRadius: '2px'}}/> English
                  </button>
                  <button className="dropdown-item" onClick={() => { i18n.changeLanguage('pt'); setLangOpen(false); }} style={{width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--clr-text-1)', padding: '8px', cursor: 'pointer', borderRadius: '6px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <img src="https://flagcdn.com/br.svg" width="18" alt="BR" style={{borderRadius: '2px'}}/> Português
                  </button>
                  <button className="dropdown-item" onClick={() => { i18n.changeLanguage('es'); setLangOpen(false); }} style={{width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--clr-text-1)', padding: '8px', cursor: 'pointer', borderRadius: '6px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <img src="https://flagcdn.com/es.svg" width="18" alt="ES" style={{borderRadius: '2px'}}/> Español
                  </button>
                </div>
              )}
            </div>
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
            <NavLink to="/" className="mobile-link" end>{t('header.home')}</NavLink>
            <div className="mobile-divider">Tools</div>
            {tools.map(tool => (
              <Link key={tool.id} to={tool.path} className="mobile-tool-link">
                <span className="mobile-tool-icon" style={{background: tool.colorLight, color: tool.color}}>
                  {tool.icon}
                </span>
                <span>{t(`tools.${tool.id}.name`, tool.name)}</span>
              </Link>
            ))}
            <div className="mobile-divider"/>
            <NavLink to="/blog" className="mobile-link">{t('blog.title', 'Blog')}</NavLink>
            <NavLink to="/contact" className="mobile-link">{t('contact.title', 'Contact')}</NavLink>
            <NavLink to="/about" className="mobile-link">{t('header.about', 'About Us')}</NavLink>
            <NavLink to="/faq" className="mobile-link">{t('header.faq')}</NavLink>
            <NavLink to="/privacy" className="mobile-link">{t('header.privacy')}</NavLink>
            <NavLink to="/terms" className="mobile-link">{t('terms.title', 'Terms of Use')}</NavLink>
            <div className="mobile-divider">{t('header.language')}</div>
            <div style={{display: 'flex', gap: '8px', padding: '12px 0'}}>
               <button onClick={() => i18n.changeLanguage('en')} style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--clr-border)', background: i18n.language.startsWith('en') ? 'var(--clr-brand-light)' : 'transparent', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                 <img src="https://flagcdn.com/us.svg" width="24" alt="US" style={{borderRadius: '2px'}} />
               </button>
               <button onClick={() => i18n.changeLanguage('pt')} style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--clr-border)', background: i18n.language.startsWith('pt') ? 'var(--clr-brand-light)' : 'transparent', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                 <img src="https://flagcdn.com/br.svg" width="24" alt="BR" style={{borderRadius: '2px'}} />
               </button>
               <button onClick={() => i18n.changeLanguage('es')} style={{flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--clr-border)', background: i18n.language.startsWith('es') ? 'var(--clr-brand-light)' : 'transparent', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                 <img src="https://flagcdn.com/es.svg" width="24" alt="ES" style={{borderRadius: '2px'}} />
               </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
