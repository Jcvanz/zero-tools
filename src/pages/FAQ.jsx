import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot';
import '../css/faq.css';

const faqs = [
  { q: 'Are all tools really free?', a: 'Yes, 100% free forever. No account, no credit card, no limits. ZeroTools is supported by non-intrusive display advertising.' },
  { q: 'Are my files uploaded to a server?', a: 'No. Every tool on ZeroTools runs entirely in your browser using modern Web APIs (Canvas, WebAssembly, FileReader). Your files never leave your device — we have zero access to them.' },
  { q: 'Does the Background Remover work offline?', a: 'After the first use, the AI model (~40MB) is cached in your browser. Subsequent uses work without re-downloading the model, but a connection is still needed to load the page.' },
  { q: 'Can I use ZeroTools on my phone?', a: 'Yes! All tools are fully responsive and work on iOS and Android browsers. Some heavy tools (like Background Remover) may be slower on older devices.' },
  { q: 'What image formats does the compressor support?', a: 'The Image Compressor supports JPG, PNG, GIF, BMP, and WebP inputs. You can export to JPG, PNG, or WebP.' },
  { q: 'How many hashtags can I generate?', a: 'Up to 30 hashtags per generation. You can combine category-based hashtags with your own custom keywords.' },
  { q: 'Why is my PDF only slightly smaller after compression?', a: 'Client-side PDF compression removes metadata and optimizes the file structure. If your PDF is mostly large embedded images, the reduction will be minimal. For heavy image-based PDFs, we recommend using a server-side tool.' },
  { q: 'Do you show ads?', a: 'Yes, ZeroTools is supported by Google AdSense display ads. This allows us to keep all tools free. Ad placements are designed to be non-intrusive and never interrupt your workflow.' },
  { q: 'Can I use the generated QR codes commercially?', a: 'Absolutely. All generated files (QR codes, compressed images, etc.) belong to you and can be used for any purpose.' },
  { q: 'How do I report a bug or suggest a new tool?', a: 'We\'d love to hear from you! Send an email to hello@myzerotools.online with your feedback.' },
];

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ — Frequently Asked Questions | ZeroTools</title>
        <meta name="description" content="Answers to common questions about ZeroTools — free online tools for QR codes, image compression, hashtag generation and more." />
        <link rel="canonical" href="https://myzerotools.online/faq" />
      </Helmet>

      <AdSlot slot="Top Leaderboard" />

      <main className="main-content tool-page">
        <div className="container">
          <div style={{maxWidth:760, margin:'0 auto'}}>
            <nav className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>FAQ</span></nav>
            <h1 className="tool-page-title">Frequently Asked Questions</h1>
            <p className="tool-page-desc" style={{marginBottom:40}}>Everything you need to know about ZeroTools.</p>

            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {faqs.map((f, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-q">{f.q}</summary>
                  <div className="faq-a"><p>{f.a}</p></div>
                </details>
              ))}
            </div>

            <div style={{marginTop:48,padding:32,background:'var(--clr-brand-lt)',borderRadius:24,textAlign:'center',border:'1px solid #c7d2fe'}}>
              <h2 style={{fontSize:'1.25rem',marginBottom:8}}>Still have questions?</h2>
              <p style={{color:'var(--clr-text-2)',marginBottom:20}}>Send us an email and we'll get back to you within 24 hours.</p>
              <a href="mailto:HelloZeroTools@outlook.com" className="btn btn-primary">✉️ Contact Us</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
