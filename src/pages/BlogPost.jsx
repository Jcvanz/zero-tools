import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { tools } from '../data/tools';
import AdSlot from '../components/AdSlot';
import '../css/blog.css';

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useTranslation();
  
  const posts = t('blog.posts', { returnObjects: true }) || [];
  
  if (!Array.isArray(posts)) {
    return <Navigate to="/blog" replace />;
  }

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Find related tool data if any
  const relatedToolData = post.relatedTool ? tools.find(tItem => tItem.id === post.relatedTool) : null;

  return (
    <>
      <Helmet>
        <title>{post.title} — ZeroTools</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://myzerotools.online/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} — ZeroTools`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://myzerotools.online/blog/${post.slug}`} />
        <meta property="og:image" content="https://myzerotools.online/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="ZeroTools" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category || 'Technology'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — ZeroTools`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content="https://myzerotools.online/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": `https://myzerotools.online/blog/${post.slug}`,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Person",
              "name": post.author || "ZeroTools Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ZeroTools",
              "url": "https://myzerotools.online",
              "logo": {
                "@type": "ImageObject",
                "url": "https://myzerotools.online/favicon.svg"
              }
            },
            "image": "https://myzerotools.online/og-image.jpg",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://myzerotools.online/blog/${post.slug}`
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://myzerotools.online/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://myzerotools.online/blog" },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://myzerotools.online/blog/${post.slug}` }
            ]
          })}
        </script>
      </Helmet>


      <main className="main-content blog-post-page" style={{padding:'60px 0 80px'}}>
        <div className="container">
          <div className="post-view">
            <Link to="/blog" className="back-to-blog">
              {t('blog.back')}
            </Link>

            <article>
              <header className="post-view-header">
                <h1>{post.title}</h1>
                <div className="post-view-meta">
                  <span>{t('blog.written_by')} <strong>{post.author}</strong></span>
                  <span>•</span>
                  <span>{t('blog.published')} <time dateTime={post.date}>{post.date}</time></span>
                  <span>•</span>
                  <span>{post.readTime} {t('blog.read_time')}</span>
                </div>
              </header>

              <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

              <AdSlot slot="In-Article 336×280" />

              {relatedToolData && (
                <div className="related-tool-box">
                  <div className="related-tool-info">
                    <span className="related-tool-icon" aria-hidden="true">{relatedToolData.icon}</span>
                    <div>
                      <span className="related-tool-label">{t('blog.related_tool')}</span>
                      <strong className="related-tool-name">{t(`tools.${relatedToolData.id}.name`, relatedToolData.name)}</strong>
                    </div>
                  </div>
                  <Link to={relatedToolData.path} className="use-tool-btn">
                    Use Tool
                  </Link>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
