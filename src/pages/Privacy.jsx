import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import '../css/privacy.css';

export default function Privacy() {
  const year = new Date().getFullYear();
  return (
    <>
      <Helmet>
        <title>Privacy Policy — ZeroTools</title>
        <meta name="description" content="ZeroTools Privacy Policy. We don't collect your files. All processing happens in your browser." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://myzerotools.online/privacy" />
      </Helmet>

      <main className="main-content" style={{padding:'60px 0 80px'}}>
        <div className="container">
          <div className="privacy-wrap">
            <Link to="/" className="back-link">← Back to ZeroTools</Link>
            <h1>Privacy Policy</h1>
            <p className="updated">Last updated: May 1, {year}</p>

            <p>ZeroTools ("we", "us", "our") operates myzerotools.online. This page describes how we handle information when you use our free online tools.</p>

            <h2>1. No File Data Collection</h2>
            <p>All image processing, PDF operations, and text transformations run <strong>entirely in your browser</strong> using Web APIs (Canvas, WebAssembly, FileReader). Your files and data are <strong>never uploaded to our servers</strong>. We cannot access, view, or store anything you process.</p>

            <h2>2. Analytics Data</h2>
            <p>We use Google Analytics 4 to understand aggregate usage patterns. This collects anonymized data including browser type, approximate location (country/city), pages visited, and session duration. This data cannot identify you personally.</p>

            <h2>3. Google AdSense</h2>
            <p>We display ads via Google AdSense. Google may use cookies to serve personalized ads based on your browsing history. You can opt out at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a>.</p>

            <h2>4. Cookies</h2>
            <p>We only use cookies through third-party services (Google Analytics, AdSense). We do not set first-party cookies for tracking.</p>

            <h2>5. Children's Privacy</h2>
            <p>ZeroTools is not directed to children under 13. We do not knowingly collect personal information from children.</p>

            <h2>6. Changes</h2>
            <p>We may update this policy occasionally. Changes will be noted with a new "last updated" date at the top of this page.</p>

            <h2>7. Contact</h2>
            <p>Questions? Email us at <a href="mailto:HelloZeroTools@outlook.com">HelloZeroTools@outlook.com</a></p>
          </div>
        </div>
      </main>
    </>
  );
}
