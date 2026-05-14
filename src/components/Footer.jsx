import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { tools } from '../data/tools';
import '../css/footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const categories = [...new Set(tools.map(t => t.category))];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-text">Zero<strong>Tools</strong></span>
            </Link>
            <p className="footer-tagline">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="footer-links-grid">
            {categories.map(cat => (
              <div key={cat} className="footer-col">
                <h4 className="footer-col-title">{t(`home.categories.${cat}`, cat)}</h4>
                <ul>
                  {tools.filter(tItem => tItem.category === cat).map(tool => (
                    <li key={tool.id}>
                      <Link to={tool.path}>{t(`tools.${tool.id}.name`, tool.name)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="footer-col">
              <h4 className="footer-col-title">{t('footer.company')}</h4>
              <ul>
                <li><Link to="/">{t('header.home')}</Link></li>
                <li><Link to="/about">{t('header.about', 'About Us')}</Link></li>
                <li><Link to="/faq">{t('header.faq')}</Link></li>
                <li><Link to="/privacy">{t('header.privacy')}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} ZeroTools. {t('footer.rights')}</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">{t('header.privacy')}</Link>
            <Link to="/faq">{t('header.faq')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
