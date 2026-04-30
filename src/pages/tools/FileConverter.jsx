import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'file-converter');

const FORMATS = ['webp','jpeg','png'];

function formatBytes(b) {
  if (b < 1024**2) return `${(b/1024).toFixed(1)} KB`;
  return `${(b/1024**2).toFixed(2)} MB`;
}

export default function FileConverter() {
  const [hover, setHover] = useState(false);
  const [targetFormat, setTargetFormat] = useState('webp');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  function convert(files) {
    setLoading(true); setResults([]);
    const list = Array.from(files).filter(f => f.type.startsWith('image/'));
    Promise.all(list.map(file => new Promise(res => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = e => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
          canvas.getContext('2d').drawImage(img, 0, 0);
          canvas.toBlob(blob => {
            res({ name: file.name.replace(/\.[^.]+$/,'') + '.' + targetFormat, size: blob.size, url: URL.createObjectURL(blob), original: file.size });
          }, `image/${targetFormat}`, 0.9);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }))).then(r => { setResults(r); setLoading(false); });
  }

  const onDrop = e => { e.preventDefault(); setHover(false); convert(e.dataTransfer.files); };

  return (
    <ToolLayout tool={tool}>
      <div className="card">
        <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
          <span style={{fontSize:'.9rem',fontWeight:600,color:'var(--clr-text-2)',display:'flex',alignItems:'center'}}>Convert to:</span>
          {FORMATS.map(f => (
            <button key={f} className={`pill-tab${targetFormat === f ? ' active' : ''}`} onClick={() => setTargetFormat(f)}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div
          className={`dropzone${hover ? ' hover' : ''}`}
          onDragOver={e => { e.preventDefault(); setHover(true); }}
          onDragLeave={() => setHover(false)}
          onDrop={onDrop}
        >
          <div style={{fontSize:'3rem'}} aria-hidden="true">🔄</div>
          <p className="dropzone-title">Drop images to convert to {targetFormat.toUpperCase()}</p>
          <p className="dropzone-sub">Multiple files supported · JPG, PNG, GIF, WebP, BMP</p>
          <label className="btn btn-outline" htmlFor="fc-file" style={{cursor:'pointer'}}>
            Browse Files
            <input type="file" id="fc-file" accept="image/*" multiple className="sr-only" onChange={e => convert(e.target.files)} />
          </label>
        </div>
      </div>

      {loading && <div style={{display:'flex',justifyContent:'center',padding:32}}><div className="spinner"/></div>}

      {results.length > 0 && (
        <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:16}}>
          {results.map((r,i) => (
            <div key={i} className="card card-sm" style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:'.9rem'}}>{r.name}</div>
                <div style={{display:'flex',gap:8,marginTop:6,flexWrap:'wrap'}}>
                  <span className="badge badge-warning">Before: {formatBytes(r.original)}</span>
                  <span className="badge badge-success">After: {formatBytes(r.size)}</span>
                </div>
              </div>
              <a className="btn btn-success btn-sm" href={r.url} download={r.name}>⬇ Download</a>
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" style={{alignSelf:'flex-start'}} onClick={() => { results.forEach(r => URL.revokeObjectURL(r.url)); setResults([]); }}>↩ Clear</button>
        </div>
      )}
    </ToolLayout>
  );
}
