import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../css/blog.css';

export default function Blog() {
  const { t } = useTranslation();
  
  // Puxa a lista de posts traduzidos
  const posts = t('blog.posts', { returnObjects: true }) || [];

  return (
    <>
      <Helmet>
        <title>{t('blog.title')} — ZeroTools</title>
        <meta name="description" content={t('blog.meta_desc')} />
        <link rel="canonical" href="https://myzerotools.online/blog" />
        <meta property="og:title" content={`${t('blog.title')} — ZeroTools`} />
        <meta property="og:description" content={t('blog.meta_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myzerotools.online/blog" />
      </Helmet>

      <main className="main-content blog-page" style={{padding:'60px 0 80px'}}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t('header.home')}</Link>
            <span aria-hidden="true">/</span>
            <span>{t('blog.title')}</span>
          </nav>

          <div className="blog-header">
            <h1>{t('blog.title')}</h1>
            <p>{t('blog.subtitle')}</p>
          </div>

          <div className="blog-grid">
            {Array.isArray(posts) && posts.map((post) => (
              <article key={post.slug} className="post-card">
                <div className="post-card-content">
                  <div className="post-meta">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime} {t('blog.read_time')}</span>
                  </div>
                  <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="read-more-link">
                    {t('blog.read_more')} <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
