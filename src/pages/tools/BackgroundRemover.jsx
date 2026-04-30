import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'background-remover');

export default function BackgroundRemover() {
  const [hover, setHover]     = useState(false);
  const [original, setOriginal] = useState(null);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [bgColor, setBgColor] = useState('transparent');

  async function processFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setError(''); setResult(null); setLoading(true);
    const originalUrl = URL.createObjectURL(file);
    setOriginal(originalUrl);
    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await removeBackground(file);
      const url  = URL.createObjectURL(blob);
      setResult(url);
    } catch (e) {
      setError('Could not process this image. Please try a different one.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const onDrop = e => { e.preventDefault(); setHover(false); processFile(e.dataTransfer.files[0]); };

  return (
    <ToolLayout tool={tool}>
      <div className="card" style={{marginBottom:20}}>
        <div className="info-banner">
          🧠 <strong>AI-powered</strong> — Runs entirely in your browser using WebAssembly. First use downloads a ~40MB model (cached afterwards).
        </div>

        {!original && (
          <div
            className={`dropzone${hover ? ' hover' : ''}`}
            style={{marginTop:16, borderColor:'#10b981', '--hover-bg':'#ecfdf5'}}
            onDragOver={e => { e.preventDefault(); setHover(true); }}
            onDragLeave={() => setHover(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById('bg-file').click()}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && document.getElementById('bg-file').click()}
          >
            <div className="dropzone-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#ecfdf5"/>
                <path d="M16 32l5-5 4 4 5-7 6 8" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 20a4 4 0 100-8 4 4 0 000 8z" stroke="#10b981" strokeWidth="2.5"/>
              </svg>
            </div>
            <p className="dropzone-title">Drop an image to remove background</p>
            <p className="dropzone-sub">JPG or PNG recommended — best results on people, products &amp; logos</p>
            <label className="btn btn-outline" htmlFor="bg-file" style={{cursor:'pointer'}}>
              Browse Image
              <input type="file" id="bg-file" accept="image/*" className="sr-only"
                onChange={e => processFile(e.target.files[0])} />
            </label>
          </div>
        )}

        {loading && (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,padding:'48px 0'}}>
            <div className="spinner" style={{width:52,height:52}} />
            <p style={{fontWeight:600,color:'#10b981'}}>Removing background — this may take 10–30 seconds…</p>
          </div>
        )}

        {error && <p className="badge badge-error" style={{marginTop:16,padding:'12px 16px'}}>{error}</p>}

        {result && (
          <div>
            <div className="tool-grid tool-grid-2" style={{marginTop:20,gap:16}}>
              <div>
                <p style={{fontWeight:600,fontSize:'.85rem',marginBottom:8,color:'var(--clr-text-3)'}}>ORIGINAL</p>
                <img src={original} alt="Original" style={{width:'100%',borderRadius:12,border:'1px solid var(--clr-border)'}} />
              </div>
              <div>
                <p style={{fontWeight:600,fontSize:'.85rem',marginBottom:8,color:'var(--clr-text-3)'}}>RESULT</p>
                <div style={{borderRadius:12,overflow:'hidden',border:'1px solid var(--clr-border)',background: bgColor === 'transparent' ? 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 16px 16px' : bgColor}}>
                  <img src={result} alt="Background removed" style={{width:'100%'}} />
                </div>
              </div>
            </div>

            <div style={{display:'flex',gap:12,marginTop:20,flexWrap:'wrap',alignItems:'center'}}>
              <div className="form-group" style={{flexDirection:'row',alignItems:'center',gap:8}}>
                <label className="form-label" htmlFor="bg-color" style={{whiteSpace:'nowrap'}}>Preview BG:</label>
                <select id="bg-color" className="form-select" style={{width:'auto'}} value={bgColor} onChange={e => setBgColor(e.target.value)}>
                  <option value="transparent">Transparent</option>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                  <option value="#f3f4f6">Light Gray</option>
                </select>
              </div>
              <a className="btn btn-success" href={result} download="background-removed-zerotools.png">⬇️ Download PNG</a>
              <button className="btn btn-ghost btn-sm" onClick={() => { setOriginal(null); setResult(null); }}>↩ Try Another</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .info-banner {
          background: #ecfdf5; border: 1px solid #a7f3d0;
          border-radius: var(--radius-md); padding: 12px 16px;
          font-size: .875rem; color: #065f46; line-height: 1.6;
        }
      `}</style>
    </ToolLayout>
  );
}
