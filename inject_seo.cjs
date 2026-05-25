const fs = require('fs');
const path = require('path');

// Carrega as traduções em inglês (default para os bots do Google)
const enTranslations = require('./src/locales/en/translation.json');

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

// Garante que o build já foi gerado
if (!fs.existsSync(indexHtmlPath)) {
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Rotas estáticas
const staticPages = [
  { 
    path: '/about', 
    title: 'About Us — ZeroTools', 
    desc: 'Learn more about ZeroTools, our mission, and our commitment to 100% private, client-side web tools.' 
  },
  { 
    path: '/faq', 
    title: 'Frequently Asked Questions | ZeroTools', 
    desc: 'Answers to the most common questions about ZeroTools, our privacy policy, and how our browser-based tools work.' 
  },
  { 
    path: '/privacy', 
    title: 'Privacy Policy — ZeroTools', 
    desc: 'Our commitment to your privacy. Learn how ZeroTools processes your data 100% locally in your browser.' 
  }
];

// Puxar rotas de ferramentas do JSON
const toolsKeys = Object.keys(enTranslations.tools);
const toolPages = toolsKeys.map(key => {
  const t = enTranslations.tools[key];
  const pageTitle = t.seoTitle || `${t.name} — Free Online Tool | ZeroTools`;
  const pageDesc = t.seoDesc || t.desc;
  
  // JSON-LD Schema
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

  return {
    path: `/tools/${key}`,
    title: pageTitle,
    desc: pageDesc,
    schema: JSON.stringify(schema),
    toolName: t.name,
    article: t.article
  };
});

const allRoutes = [...staticPages, ...toolPages];

function getBodyHtml(route) {
  if (route.path === '/about') {
    const ab = enTranslations.about || {};
    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 2.5rem; margin-bottom: 24px; color: #111827;">${ab.title || 'About Us'}</h1>
          <div class="card" style="padding: 32px; margin-bottom: 32px; line-height: 1.8; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
            <h2 style="margin-bottom: 16px; color: #6366f1; font-size: 1.5rem;">${ab.mission_title || 'Our Mission'}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${ab.mission_desc || ''}</p>
            <h2 style="margin-bottom: 16px; color: #6366f1; font-size: 1.5rem;">${ab.privacy_title || '100% Client-Side Processing'}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${ab.privacy_desc || ''}</p>
            <h2 style="margin-bottom: 16px; color: #6366f1; font-size: 1.5rem;">${ab.free_title || 'Free for Everyone'}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${ab.free_desc || ''}</p>
            <h2 style="margin-bottom: 16px; color: #6366f1; font-size: 1.5rem;">${ab.contact_title || 'Get in Touch'}</h2>
            <p style="color: #4b5563;">${ab.contact_desc || ''} HelloZeroTools@outlook.com</p>
          </div>
        </div>
      </main>
    `;
  }
  if (route.path === '/faq') {
    const faq = enTranslations.faq_page || {};
    const faqs = faq.faqs || [];
    const faqsHtml = faqs.map(item => `
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.2rem; margin-bottom: 8px; color: #1f2937; font-weight: 600;">${item.q}</h3>
        <p style="color: #4b5563; line-height: 1.6;">${item.a}</p>
      </div>
    `).join('');
    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${faq.title || 'Frequently Asked Questions'}</h1>
          <p style="color: #4b5563; margin-bottom: 32px; font-size: 1.1rem;">${faq.desc || ''}</p>
          <div class="card" style="padding: 32px; margin-bottom: 32px; line-height: 1.8; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
            ${faqsHtml}
          </div>
        </div>
      </main>
    `;
  }
  if (route.path === '/privacy') {
    const pr = enTranslations.privacy || {};
    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${pr.title || 'Privacy Policy'}</h1>
          <p style="color: #4b5563; margin-bottom: 24px; font-size: 1.1rem;">${pr.intro || ''}</p>
          <div class="card" style="padding: 32px; margin-bottom: 32px; line-height: 1.8; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
            <h2 style="font-size: 1.5rem; margin-bottom: 12px; color: #1f2937;">${pr.title1 || ''}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${pr.p1 || ''}</p>
            <h2 style="font-size: 1.5rem; margin-bottom: 12px; color: #1f2937;">${pr.title2 || ''}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${pr.p2 || ''}</p>
            <h2 style="font-size: 1.5rem; margin-bottom: 12px; color: #1f2937;">${pr.title3 || ''}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${pr.p3 || ''}</p>
            <h2 style="font-size: 1.5rem; margin-bottom: 12px; color: #1f2937;">${pr.title4 || ''}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${pr.p4 || ''}</p>
            <h2 style="font-size: 1.5rem; margin-bottom: 12px; color: #1f2937;">${pr.title5 || ''}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${pr.p5 || ''}</p>
            <h2 style="font-size: 1.5rem; margin-bottom: 12px; color: #1f2937;">${pr.title6 || ''}</h2>
            <p style="margin-bottom: 24px; color: #4b5563;">${pr.p6 || ''}</p>
            <h2 style="font-size: 1.5rem; margin-bottom: 12px; color: #1f2937;">${pr.title7 || ''}</h2>
            <p style="color: #4b5563;">${pr.p7 || ''}</p>
          </div>
        </div>
      </main>
    `;
  }
  if (route.path.startsWith('/tools/')) {
    const layout = enTranslations.tool_layout || {};
    return `
      <main class="tool-page main-content" style="font-family: system-ui, -apple-system, sans-serif;">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 2.5rem; margin-bottom: 12px; color: #111827;">${route.toolName}</h1>
          <p style="font-size: 1.2rem; color: #4b5563; margin-bottom: 32px;">${route.desc}</p>
          
          <div class="tool-seo-content" style="margin-top: 48px; padding: 32px; background-color: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; line-height: 1.8;">
            ${route.article || `
              <h2 style="font-size: 1.5rem; margin-bottom: 16px; color: #1f2937;">${layout.about || 'About the'} ${route.toolName}</h2>
              <p style="color: #4b5563; margin-bottom: 24px;">
                ${route.toolName} ${layout.about_sub || 'is a powerful utility designed to help you with your daily tasks. It is completely free to use and requires no registration.'}
              </p>
            `}
            
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              <h3 style="font-size: 1.25rem; margin-bottom: 12px; color: #1f2937;">${layout.privacy_title || '🔒 100% Privacy & Client-Side Processing'}</h3>
              <p style="color: #4b5563;">
                ${layout.privacy_desc || 'Unlike other online tools that upload your files to external servers, our tool operates entirely within your browser. We utilize modern web technologies to process everything locally on your device.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    `;
  }
  return '';
}

allRoutes.forEach(route => {
  const routeDir = path.join(distDir, route.path);
  
  // Cria a pasta da rota (ex: dist/tools/qr-code)
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  let html = baseHtml;

  // Substitui Title
  html = html.replace(
    /<title>.*?<\/title>/i, 
    `<title>${route.title}</title>`
  );

  // Substitui Meta Description
  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/i,
    `<meta name="description" content="${route.desc}" />`
  );

  // Adiciona Canonical e OG Tags (antes do fechamento do head)
  const canonical = `https://myzerotools.online${route.path}`;
  const seoTags = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.desc}" />
    <meta property="og:url" content="${canonical}" />
    ${route.schema ? `<script type="application/ld+json">${route.schema}</script>` : ''}
  `;
  
  // Remove canonical antigo se existir para evitar duplicidade
  html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/ig, '');
  
  html = html.replace('</head>', `${seoTags}\n  </head>`);

  // Injeta o HTML pré-renderizado dentro da div#root para os indexadores/AdSense
  const bodyHtml = getBodyHtml(route);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  // Salva o novo index.html dentro da pasta específica
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
});