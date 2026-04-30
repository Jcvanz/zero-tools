import { useState, useCallback } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'image-compressor');

function formatBytes(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1024**2) return `${(b/1024).toFixed(1)} KB`;
  return `${(b/1024**2).toFixed(2)} MB`;
}

export default function ImageCompressor() {
  const [hover, setHover]     = useState(false);
  const [results, setResults] = useState([]);
  const [quality, setQuality] = useState(82);
  const [format, setFormat]   = useState('webp');
  const [loading, setLoading] = useState(false);

  const compress = useCallback((files) => {
    setLoading(true);
    const promises = Array.from(files).filter(f => f.type.startsWith('image/')).map(file => {
      return new Promise(resolve => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = e => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(blob => {
              const url = URL.createObjectURL(blob);
              resolve({ name: file.name.replace(/\.[^.]+$/, '') + '.' + format, original: file.size, compressed: blob.size, url, blob, originalUrl: e.target.result });
            }, `image/${format}`, quality / 100);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(res => { setResults(res); setLoading(false); });
  }, [quality, format]);

  const onDrop = e => { e.preventDefault(); setHover(false); compress(e.dataTransfer.files); };
  const onFile = e => compress(e.target.files);

  return (
    <ToolLayout tool={tool}>
      <div className="card" style={{marginBottom:20}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:16,marginBottom:20,alignItems:'end'}}>
          <div className="form-group">
            <label className="form-label" htmlFor="ic-format">Output Format</label>
            <select id="ic-format" className="form-select" value={format} onChange={e => setFormat(e.target.value)}>
              <option value="webp">WebP (Recommended)</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="ic-quality">Quality: <strong>{quality}%</strong></label>
            <input type="range" id="ic-quality" min="10" max="100" value={quality}
              onChange={e => { setQuality(+e.target.value); e.target.style.setProperty('--pct',`${((+e.target.value-10)/90)*100}%`); }}
              style={{'--pct': `${((quality-10)/90)*100}%`}}
            />
          </div>
          <label className="btn btn-outline" htmlFor="ic-file" style={{cursor:'pointer',height:'fit-content'}}>
            Browse Files
            <input type="file" id="ic-file" accept="image/*" multiple className="sr-only" onChange={onFile} />
          </label>
        </div>

        <div className={`dropzone${hover ? ' hover' : ''}`}
          onDragOver={e => { e.preventDefault(); setHover(true); }}
          onDragLeave={() => setHover(false)}
          onDrop={onDrop}
        >
          <div className="dropzone-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#fffbeb"/>
              <path d="M24 16v12M20 20l4-4 4 4" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 32h16" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="dropzone-title">Drag &amp; drop images here</p>
          <p className="dropzone-sub">JPG, PNG, GIF, WebP — multiple files supported</p>
        </div>
      </div>

      {loading && <div style={{display:'flex',justifyContent:'center',padding:32}}><div className="spinner"/></div>}

      {results.length > 0 && (
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {results.map((r, i) => {
            const saving = ((1 - r.compressed/r.original)*100).toFixed(1);
            return (
              <div key={i} className="card card-sm" style={{display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
                <img src={r.url} alt={r.name} style={{width:80,height:60,objectFit:'cover',borderRadius:8,border:'1px solid var(--clr-border)'}} />
                <div style={{flex:1,minWidth:160}}>
                  <div style={{fontWeight:600,fontSize:'.9rem',marginBottom:6}}>{r.name}</div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    <span className="badge badge-warning">Before: {formatBytes(r.original)}</span>
                    <span className="badge badge-success">After: {formatBytes(r.compressed)}</span>
                    <span className="badge badge-brand">↓ {saving}% smaller</span>
                  </div>
                </div>
                <a className="btn btn-success btn-sm" href={r.url} download={r.name}>⬇ Download</a>
              </div>
            );
          })}
          <button className="btn btn-ghost btn-sm" onClick={() => { results.forEach(r => URL.revokeObjectURL(r.url)); setResults([]); }}>
            ↩ Clear All
          </button>
        </div>
      )}
    </ToolLayout>
  );
}
