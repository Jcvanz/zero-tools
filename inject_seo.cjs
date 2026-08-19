const fs = require('fs');
const path = require('path');

// Load English translations (default for Google bots)
const enTranslations = require('./src/locales/en/translation.json');

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Build not found. Run "npm run build" first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Helper: escape HTML entities in text
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Static pages
const staticPages = [
  {
    path: '/',
    title: 'ZeroTools — Free Online Tools for Creators & Developers',
    desc: 'Free online tools: QR code generator, hashtag generator, image compressor, background remover, PDF compressor, password generator and more. No signup, no upload — works in your browser.'
  },
  { 
    path: '/about', 
    title: `${enTranslations.about.title} — ZeroTools`, 
    desc: enTranslations.about.meta_desc
  },
  { 
    path: '/sobre', 
    title: `${enTranslations.about.title} — ZeroTools`, 
    desc: enTranslations.about.meta_desc
  },
  { 
    path: '/faq', 
    title: `${enTranslations.faq_page.title} | ZeroTools`, 
    desc: enTranslations.faq_page.meta_desc
  },
  { 
    path: '/privacy', 
    title: `${enTranslations.privacy.title} — ZeroTools`, 
    desc: enTranslations.privacy.meta_desc
  },
  { 
    path: '/politica-de-privacidade', 
    title: `${enTranslations.privacy.title} — ZeroTools`, 
    desc: enTranslations.privacy.meta_desc
  },
  { 
    path: '/terms', 
    title: `${enTranslations.terms.title} — ZeroTools`, 
    desc: enTranslations.terms.meta_desc
  },
  { 
    path: '/termos-de-uso', 
    title: `${enTranslations.terms.title} — ZeroTools`, 
    desc: enTranslations.terms.meta_desc
  },
  { 
    path: '/contact', 
    title: `${enTranslations.contact.title} — ZeroTools`, 
    desc: enTranslations.contact.meta_desc
  },
  { 
    path: '/contato', 
    title: `${enTranslations.contact.title} — ZeroTools`, 
    desc: enTranslations.contact.meta_desc
  },
  { 
    path: '/blog', 
    title: `${enTranslations.blog.title} — ZeroTools`, 
    desc: enTranslations.blog.meta_desc
  }
];

// Tool pages from JSON
const toolsKeys = Object.keys(enTranslations.tools);
const toolPages = toolsKeys.map(key => {
  const t = enTranslations.tools[key];
  const pageTitle = t.seoTitle || `${t.name} — Free Online Tool | ZeroTools`;
  const pageDesc = t.seoDesc || t.desc;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t.name,
    "description": pageDesc,
    "url": `https://myzerotools.online/tools/${key}`,
    "applicationCategory": "BrowserApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // FAQ Schema
  const faqSchema = Array.isArray(t.faq) && t.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  return {
    path: `/tools/${key}`,
    title: pageTitle,
    desc: pageDesc,
    schema: JSON.stringify(schema),
    faqSchema: faqSchema ? JSON.stringify(faqSchema) : null,
    toolKey: key,
    toolData: t
  };
});

// Blog post pages from JSON
const blogPostsKeys = enTranslations.blog.posts || [];
const blogPostPages = blogPostsKeys.map(post => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ZeroTools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://myzerotools.online/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://myzerotools.online/blog/${post.slug}`
    }
  };

  return {
    path: `/blog/${post.slug}`,
    title: `${post.title} — ZeroTools`,
    desc: post.excerpt,
    schema: JSON.stringify(schema),
    postData: post
  };
});

const allRoutes = [...staticPages, ...toolPages, ...blogPostPages];

const layout = enTranslations.tool_layout || {};
const FEATURE_KEYS = ['interface', 'processing', 'options', 'unlimited', 'security'];
const FEATURE_LABELS = {
  interface: layout.feat_interface || '🖥️ Simple & Intuitive Interface',
  processing: layout.feat_processing || '⚡ Fast Local Processing',
  options: layout.feat_options || '🔧 Customization Options',
  unlimited: layout.feat_unlimited || '♾️ Unlimited Usage',
  security: layout.feat_security || '🔒 Privacy & Security'
};

function getBodyHtml(route) {
  // ─── HOME PAGE ───
  if (route.path === '/') {
    const home = enTranslations.home || {};
    const hero = enTranslations.hero || {};
    const homeFaq = enTranslations.home_faq || {};
    const faqs = homeFaq.faqs || [];

    // Tool listing HTML
    const toolListHtml = toolsKeys.map(key => {
      const t = enTranslations.tools[key];
      return `
        <div style="padding: 20px; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.1rem; margin-bottom: 8px;"><a href="/tools/${key}" style="color: #4f46e5; text-decoration: none;">${esc(t.name)}</a></h3>
          <p style="color: #4b5563; font-size: 0.95rem; line-height: 1.6;">${esc(t.desc)}</p>
        </div>
      `;
    }).join('');

    // Why ZeroTools section
    const whyItems = [
      { title: home.why_1_title, desc: home.why_1_desc },
      { title: home.why_2_title, desc: home.why_2_desc },
      { title: home.why_3_title, desc: home.why_3_desc },
      { title: home.why_4_title, desc: home.why_4_desc },
    ].filter(w => w.title && w.desc);

    const whyHtml = whyItems.map(w => `
      <div style="padding: 20px; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
        <h3 style="font-size: 1rem; margin-bottom: 8px; color: #1f2937;">${esc(w.title)}</h3>
        <p style="color: #4b5563; font-size: 0.95rem; line-height: 1.6;">${esc(w.desc)}</p>
      </div>
    `).join('');

    // Home FAQ section
    const faqHtml = faqs.map(f => `
      <details style="margin-bottom: 8px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <summary style="padding: 14px 18px; cursor: pointer; font-weight: 600; color: #1f2937;">${esc(f.q)}</summary>
        <div style="padding: 0 18px 14px;"><p style="color: #4b5563; line-height: 1.6;">${esc(f.a)}</p></div>
      </details>
    `).join('');

    return `
      <main style="font-family: system-ui, -apple-system, sans-serif; padding: 40px 0;">
        <div style="max-width: 900px; margin: 0 auto; padding: 0 24px;">
          <section style="text-align: center; margin-bottom: 48px;">
            <h1 style="font-size: 2.5rem; margin-bottom: 16px; color: #111827;">${esc(hero.title || 'The Free Toolbox for')} ${esc(hero.creators_devs || 'Creators & Developers')}</h1>
            <p style="font-size: 1.2rem; color: #4b5563; line-height: 1.8; max-width: 700px; margin: 0 auto;">${esc(hero.subtitle || '')}</p>
          </section>

          <section style="margin-bottom: 48px; text-align: center;">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: #111827;">${esc(home.intro_title || 'Your Complete Free Online Toolbox')}</h2>
            <p style="color: #4b5563; line-height: 1.8; font-size: 1rem;">${esc(home.intro_text || '')}</p>
          </section>

          <section style="margin-bottom: 48px;">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: #111827; text-align: center;">${esc(home.why_title || 'Why ZeroTools?')}</h2>
            <p style="color: #4b5563; margin-bottom: 24px; text-align: center;">${esc(home.why_sub || '')}</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
              ${whyHtml}
            </div>
          </section>

          <section style="margin-bottom: 48px;">
            <h2 style="font-size: 1.5rem; margin-bottom: 24px; color: #111827; text-align: center;">Our Free Online Tools</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
              ${toolListHtml}
            </div>
          </section>

          <section style="margin-bottom: 48px;">
            <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: #111827; text-align: center;">${esc(homeFaq.title || 'Frequently Asked Questions')}</h2>
            <p style="color: #4b5563; margin-bottom: 24px; text-align: center;">${esc(homeFaq.subtitle || '')}</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${faqHtml}
            </div>
          </section>
        </div>
      </main>
    `;
  }

  // ─── ABOUT ───
  if (route.path === '/about') {
    const ab = enTranslations.about || {};
    const sections = [
      { title: ab.mission_title, desc: ab.mission_desc },
      { title: ab.history_title, desc: ab.history_desc },
      { title: ab.privacy_title, desc: ab.privacy_desc },
      { title: ab.tech_title, desc: ab.tech_desc },
      { title: ab.free_title, desc: ab.free_desc },
      { title: ab.contact_title, desc: `${ab.contact_desc || ''} <a href="mailto:HelloZeroTools@outlook.com">HelloZeroTools@outlook.com</a>.` },
    ].filter(s => s.title && s.desc);

    const sectionsHtml = sections.map(s => `
      <section>
        <h2 style="margin-bottom: 16px; color: #6366f1; font-size: 1.5rem;">${s.title}</h2>
        <p style="margin-bottom: 24px; color: #4b5563; line-height: 1.8;">${s.desc}</p>
      </section>
    `).join('');

    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <span>About</span></nav>
          <h1 style="font-size: 2.5rem; margin-bottom: 24px; color: #111827;">${ab.title || 'About Us'}</h1>
          <article class="card" style="padding: 32px; margin-bottom: 32px; line-height: 1.8; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
            ${sectionsHtml}
          </article>
        </div>
      </main>
    `;
  }

  // ─── FAQ ───
  if (route.path === '/faq') {
    const faq = enTranslations.faq_page || {};
    const faqs = faq.faqs || [];
    const faqsHtml = faqs.map(item => `
      <details style="margin-bottom: 12px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <summary style="font-size: 1.1rem; padding: 16px 20px; cursor: pointer; font-weight: 600; color: #1f2937;">${esc(item.q)}</summary>
        <div style="padding: 0 20px 16px;"><p style="color: #4b5563; line-height: 1.6;">${esc(item.a)}</p></div>
      </details>
    `).join('');

    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <span>FAQ</span></nav>
          <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${faq.title || 'Frequently Asked Questions'}</h1>
          <p style="color: #4b5563; margin-bottom: 32px; font-size: 1.1rem;">${faq.desc || ''}</p>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${faqsHtml}
          </div>
          <div style="margin-top: 48px; padding: 32px; background: #eef2ff; border-radius: 24px; text-align: center; border: 1px solid #c7d2fe;">
            <h2 style="font-size: 1.25rem; margin-bottom: 8px;">${faq.still || 'Still have questions?'}</h2>
            <p style="color: #4b5563; margin-bottom: 20px;">${faq.still_desc || ''}</p>
            <a href="mailto:HelloZeroTools@outlook.com" style="display: inline-block; padding: 10px 24px; background: #6366f1; color: white; border-radius: 12px; text-decoration: none;">${faq.contact || 'Contact Us'}</a>
          </div>
        </div>
      </main>
    `;
  }

  // ─── PRIVACY ───
  if (route.path === '/privacy') {
    const pr = enTranslations.privacy || {};
    let sectionsHtml = '';
    for (let i = 1; i <= 12; i++) {
      const title = pr[`title${i}`];
      const body = pr[`p${i}`];
      if (title && body) {
        sectionsHtml += `
          <section>
            <h2 style="font-size: 1.3rem; margin: 24px 0 12px; color: #1f2937;">${title}</h2>
            <p style="margin-bottom: 16px; color: #4b5563; line-height: 1.8;">${body}</p>
          </section>
        `;
      }
    }

    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <span>Privacy</span></nav>
          <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${pr.title || 'Privacy Policy'}</h1>
          <p style="color: #6b7280; margin-bottom: 24px;">${pr.updated ? pr.updated.replace('{{year}}', new Date().getFullYear()) : ''}</p>
          <article style="padding: 32px; line-height: 1.8; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
            <p style="color: #4b5563; margin-bottom: 24px;">${pr.intro || ''}</p>
            ${sectionsHtml}
          </article>
        </div>
      </main>
    `;
  }

  // ─── TERMS ───
  if (route.path === '/terms') {
    const tr = enTranslations.terms || {};
    let sectionsHtml = '';
    for (let i = 1; i <= 12; i++) {
      const title = tr[`title${i}`];
      const body = tr[`p${i}`];
      if (title && body) {
        sectionsHtml += `
          <section>
            <h2 style="font-size: 1.3rem; margin: 24px 0 12px; color: #1f2937;">${title}</h2>
            <p style="margin-bottom: 16px; color: #4b5563; line-height: 1.8;">${body}</p>
          </section>
        `;
      }
    }

    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <span>Terms</span></nav>
          <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${tr.title || 'Terms of Service'}</h1>
          <p style="color: #6b7280; margin-bottom: 24px;">${tr.updated ? tr.updated.replace('{{year}}', new Date().getFullYear()) : ''}</p>
          <article style="padding: 32px; line-height: 1.8; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
            <p style="color: #4b5563; margin-bottom: 24px;">${tr.intro || ''}</p>
            ${sectionsHtml}
          </article>
        </div>
      </main>
    `;
  }

  // ─── CONTACT ───
  if (route.path === '/contact') {
    const ct = enTranslations.contact || {};
    const infoItems = ct.info_items || [];
    const infoHtml = infoItems.map(item => `<li style="margin-bottom: 12px; color: #4b5563;">✓ ${esc(item)}</li>`).join('');

    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 900px; margin: 0 auto; padding: 24px;">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <span>Contact</span></nav>
          <div style="text-align: center; margin-bottom: 48px;">
            <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${ct.heading || 'Contact Us'}</h1>
            <p style="color: #4b5563; font-size: 1.1rem; max-width: 650px; margin: 0 auto;">${ct.desc || ''}</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
            <div style="background: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid #e5e7eb;">
              <h3 style="font-size: 1.25rem; margin-bottom: 12px;">${ct.email_title || 'Email'}</h3>
              <p style="color: #4b5563; line-height: 1.6; font-size: 0.95rem; margin-bottom: 20px;">${ct.email_desc || ''}</p>
              <div style="background: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #e5e7eb;">
                <span style="display: block; font-size: 0.8rem; color: #6b7280; text-transform: uppercase; margin-bottom: 4px;">${ct.email_label || ''}</span>
                <a href="mailto:HelloZeroTools@outlook.com" style="font-size: 1.1rem; font-weight: 600; color: #6366f1; text-decoration: none;">HelloZeroTools@outlook.com</a>
              </div>
              <div style="margin-top: 16px; display: inline-block; background: rgba(99, 102, 241, 0.08); color: #6366f1; font-weight: 600; font-size: 0.85rem; padding: 6px 12px; border-radius: 20px;">
                ${ct.response_time || ''}
              </div>
            </div>
            <div style="background: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid #e5e7eb;">
              <h3 style="font-size: 1.25rem; margin-bottom: 12px;">${ct.info_title || 'Information'}</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${infoHtml}
              </ul>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  // ─── BLOG LIST ───
  if (route.path === '/blog') {
    const bl = enTranslations.blog || {};
    const posts = bl.posts || [];
    const postsHtml = posts.map(post => `
      <article style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 24px;">
        <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
          <div style="display: flex; gap: 12px; font-size: 0.85rem; color: #6b7280; margin-bottom: 12px;">
            <time>${post.date}</time>
            <span>•</span>
            <span>${post.readTime} ${bl.read_time || 'min read'}</span>
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;"><a href="/blog/${post.slug}" style="color: #111827; text-decoration: none;">${esc(post.title)}</a></h2>
          <p style="color: #4b5563; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">${esc(post.excerpt)}</p>
          <a href="/blog/${post.slug}" style="font-weight: 600; color: #6366f1; text-decoration: none;">${bl.read_more || 'Read More'} →</a>
        </div>
      </article>
    `).join('');

    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif; padding: 60px 0;">
        <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 24px;">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <span>Blog</span></nav>
          <div style="text-align: center; margin-bottom: 56px;">
            <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${bl.title || 'Blog'}</h1>
            <p style="color: #4b5563; font-size: 1.15rem;">${bl.subtitle || ''}</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px;">
            ${postsHtml}
          </div>
        </div>
      </main>
    `;
  }

  // ─── BLOG POST DETAIL ───
  if (route.path.startsWith('/blog/')) {
    const post = route.postData;
    if (!post) return '';
    const bl = enTranslations.blog || {};

    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif; padding: 60px 0;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <a href="/blog" style="display: inline-flex; align-items: center; gap: 8px; color: #6366f1; text-decoration: none; font-weight: 600; margin-bottom: 32px;">← ${bl.back || 'Back to Blog'}</a>
          <article style="background: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e5e7eb; line-height: 1.8;">
            <header style="text-align: center; margin-bottom: 32px;">
              <h1 style="font-size: 2.25rem; line-height: 1.3; color: #111827; margin-bottom: 16px;">${esc(post.title)}</h1>
              <div style="color: #6b7280; font-size: 0.9rem;">
                <span>${bl.written_by || 'Written by'} <strong>${esc(post.author)}</strong></span>
                <span style="margin: 0 8px;">•</span>
                <span>${bl.published || 'Published on'} <time>${post.date}</time></span>
                <span style="margin: 0 8px;">•</span>
                <span>${post.readTime} ${bl.read_time || 'min read'}</span>
              </div>
            </header>
            <div style="font-size: 1.1rem; line-height: 1.8; color: #374151;">
              ${post.content}
            </div>
          </article>
        </div>
      </main>
    `;
  }

  // ─── TOOL PAGES ───
  if (route.path.startsWith('/tools/')) {
    const t = route.toolData;
    if (!t) return '';

    // What is section
    const whatIsHtml = t.whatIs ? `
      <section style="margin-bottom: 24px;">
        <h2 style="font-size: 1.4rem; margin-bottom: 12px; color: #1f2937;">${layout.what_is || 'What is the'} ${t.name}?</h2>
        <p style="color: #4b5563; line-height: 1.8;">${esc(t.whatIs)}</p>
      </section>
    ` : '';

    // Article section
    const articleHtml = t.article ? `
      <section style="margin-bottom: 24px;" class="custom-article-content">
        ${t.article}
      </section>
    ` : `
      <section style="margin-bottom: 24px;">
        <h2 style="font-size: 1.4rem; margin-bottom: 12px; color: #1f2937;">${layout.about || 'About the'} ${t.name}</h2>
        <p style="color: #4b5563; line-height: 1.8;">${t.name} ${layout.about_sub || 'is a powerful utility designed to help you with your daily tasks.'}</p>
      </section>
    `;

    // Features section
    let featuresHtml = '';
    if (t.features) {
      const featureItems = FEATURE_KEYS.map(key => {
        if (!t.features[key]) return '';
        return `
          <div style="padding: 16px; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
            <h3 style="font-size: 1rem; margin-bottom: 8px; color: #1f2937;">${FEATURE_LABELS[key]}</h3>
            <p style="color: #4b5563; line-height: 1.6; font-size: 0.95rem;">${esc(t.features[key])}</p>
          </div>
        `;
      }).filter(Boolean).join('');

      featuresHtml = `
        <section style="margin-bottom: 24px;">
          <h2 style="font-size: 1.4rem; margin-bottom: 16px; color: #1f2937;">${layout.features_title || 'Key Features of'} ${t.name}</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
            ${featureItems}
          </div>
        </section>
      `;
    }

    // Privacy section
    const privacyHtml = `
      <section style="padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <h3 style="font-size: 1.1rem; margin-bottom: 12px; color: #1f2937;">${layout.privacy_title || '🔒 100% Privacy'}</h3>
        <p style="color: #4b5563; line-height: 1.6;">${layout.privacy_desc || ''}</p>
      </section>
    `;

    // FAQ section
    let faqHtml = '';
    if (Array.isArray(t.faq) && t.faq.length > 0) {
      const faqItems = t.faq.map(f => `
        <details style="margin-bottom: 8px; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <summary style="padding: 14px 18px; cursor: pointer; font-weight: 600; color: #1f2937; font-size: 0.95rem;">${esc(f.q)}</summary>
          <div style="padding: 0 18px 14px;"><p style="color: #4b5563; line-height: 1.6; font-size: 0.9rem;">${esc(f.a)}</p></div>
        </details>
      `).join('');

      faqHtml = `
        <section style="padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <h2 style="font-size: 1.3rem; margin-bottom: 16px; color: #1f2937;">${layout.faq_title || 'FAQ about'} ${t.name}</h2>
          <div>
            ${faqItems}
          </div>
        </section>
      `;
    }

    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <span>${esc(t.name)}</span></nav>
          <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${esc(t.name)}</h1>
          <p style="font-size: 1.2rem; color: #4b5563; margin-bottom: 32px;">${esc(route.desc)}</p>
          
          <article class="tool-seo-content" style="margin-top: 32px; padding: 32px; background-color: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; line-height: 1.8;">
            ${whatIsHtml}
            ${articleHtml}
            ${featuresHtml}
            ${privacyHtml}
            ${faqHtml}
          </article>
        </div>
      </main>
    `;
  }

  return '';
}

// ─── Generate HTML files for each route ───
allRoutes.forEach(route => {
  let html = baseHtml;

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/i, 
    `<title>${route.title}</title>`
  );

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/i,
    `<meta name="description" content="${route.desc}" />`
  );

  // Add Canonical and OG Tags
  const canonical = `https://myzerotools.online${route.path === '/' ? '/' : route.path}`;
  let seoTags = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.desc}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
  `;

  // Add schemas
  if (route.schema) {
    seoTags += `<script type="application/ld+json">${route.schema}</script>\n`;
  }
  if (route.faqSchema) {
    seoTags += `<script type="application/ld+json">${route.faqSchema}</script>\n`;
  }

  // Home page: Add Organization schema
  if (route.path === '/') {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ZeroTools",
      "url": "https://myzerotools.online",
      "description": route.desc,
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://myzerotools.online/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
    seoTags += `<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>\n`;
  }
  
  // Remove old canonical to avoid duplicates
  html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/ig, '');
  
  html = html.replace('</head>', `${seoTags}\n  </head>`);

  // Inject pre-rendered HTML into div#root
  const bodyHtml = getBodyHtml(route);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  // For the home page, overwrite dist/index.html directly
  if (route.path === '/') {
    fs.writeFileSync(indexHtmlPath, html);
    console.log('  → / (index.html overwritten with pre-rendered home)');
  } else {
    const routeDir = path.join(distDir, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  }
});

console.log(`✅ SEO injection complete: ${allRoutes.length} pages generated`);