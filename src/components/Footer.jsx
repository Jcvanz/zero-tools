import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import '../css/footer.css';

export default function Footer() {
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
              Free online tools — no signup, no upload, no tracking.
              Everything runs in your browser.
            </p>
          </div>

          <div className="footer-links-grid">
            {categories.map(cat => (
              <div key={cat} className="footer-col">
                <h4 className="footer-col-title">{cat}</h4>
                <ul>
                  {tools.filter(t => t.category === cat).map(tool => (
                    <li key={tool.id}>
                      <Link to={tool.path}>{tool.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="footer-col">
              <h4 className="footer-col-title">Company</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} ZeroTools. All rights reserved. Built for creators &amp; developers.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
