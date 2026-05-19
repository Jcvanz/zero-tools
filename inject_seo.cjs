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
    schema: JSON.stringify(schema)
  };
});

const allRoutes = [...staticPages, ...toolPages];

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

  // Salva o novo index.html dentro da pasta específica
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
});