import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'pdf-compressor');

function formatBytes(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1024**2) return `${(b/1024).toFixed(1)} KB`;
  return `${(b/1024**2).toFixed(2)} MB`;
}

export default function PDFCompressor() {
  const [hover, setHover] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function process(file) {
    if (!file || file.type !== 'application/pdf') { setError('Please upload a valid PDF file.'); return; }
    setError(''); setResult(null); setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Optimize: remove unnecessary metadata
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('ZeroTools PDF Optimizer');
      pdfDoc.setCreator('ZeroTools');

      const pdfBytes = await pdfDoc.save({ useObjectStreams: true, addDefaultPage: false });
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const saving = ((1 - blob.size / file.size) * 100).toFixed(1);
      setResult({ url, original: file.size, compressed: blob.size, saving, name: file.name.replace('.pdf','') + '-optimized.pdf', pages: pdfDoc.getPageCount() });
    } catch (e) {
      setError('Could not process this PDF. It may be encrypted or corrupted.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const onDrop = e => { e.preventDefault(); setHover(false); process(e.dataTransfer.files[0]); };

  return (
    <ToolLayout tool={tool}>
      <div className="card">
        <div className="info-banner" style={{background:'#fef2f2',border:'1px solid #fca5a5',color:'#991b1b',marginBottom:16}}>
          ℹ️ Client-side optimization: removes embedded metadata and optimizes PDF structure. For heavy image-based PDFs, reduction may be minimal.
        </div>

        {!result && !loading && (
          <div
            className={`dropzone${hover ? ' hover' : ''}`}
            style={{borderColor:'#ef4444'}}
            onDragOver={e => { e.preventDefault(); setHover(true); }}
            onDragLeave={() => setHover(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById('pdf-file').click()}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && document.getElementById('pdf-file').click()}
          >
            <div style={{fontSize:'3rem'}} aria-hidden="true">📄</div>
            <p className="dropzone-title">Drop your PDF here</p>
            <p className="dropzone-sub">Maximum 50MB</p>
            <label className="btn btn-outline" htmlFor="pdf-file" style={{cursor:'pointer', borderColor:'#ef4444', color:'#ef4444'}}>
              Browse PDF
              <input type="file" id="pdf-file" accept=".pdf,application/pdf" className="sr-only" onChange={e => process(e.target.files[0])} />
            </label>
          </div>
        )}

        {loading && (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,padding:'48px 0'}}>
            <div className="spinner" style={{borderTopColor:'#ef4444',borderColor:'#fee2e2'}} />
            <p style={{fontWeight:600,color:'#ef4444'}}>Optimizing PDF…</p>
          </div>
        )}

        {error && <p style={{background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:8,padding:'12px 16px',color:'#991b1b',fontSize:'.9rem',marginTop:12}}>{error}</p>}

        {result && (
          <div style={{display:'flex',flexDirection:'column',gap:16,marginTop:8}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:12}}>
              {[
                {label:'Pages', value: result.pages},
                {label:'Original Size', value: formatBytes(result.original)},
                {label:'Optimized Size', value: formatBytes(result.compressed)},
                {label:'Reduction', value: `${result.saving > 0 ? '↓' : ''} ${Math.abs(result.saving)}%`},
              ].map(s => (
                <div key={s.label} style={{background:'var(--clr-bg)',borderRadius:12,padding:'16px',textAlign:'center',border:'1px solid var(--clr-border)'}}>
                  <div style={{fontSize:'1.5rem',fontWeight:800,color:'#ef4444'}}>{s.value}</div>
                  <div style={{fontSize:'.75rem',color:'var(--clr-text-3)',fontWeight:500,marginTop:4}}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <a className="btn btn-success" href={result.url} download={result.name}>⬇️ Download Optimized PDF</a>
              <button className="btn btn-ghost btn-sm" onClick={() => { URL.revokeObjectURL(result.url); setResult(null); }}>↩ Try Another</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .info-banner { border-radius: var(--radius-md); padding: 12px 16px; font-size: .875rem; line-height: 1.6; }
      `}</style>
    </ToolLayout>
  );
}
