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
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
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
