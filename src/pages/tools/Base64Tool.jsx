import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'base64');

export default function Base64Tool() {
  const [mode, setMode]   = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError]  = useState('');
  const [copied, setCopied] = useState(false);

  function process() {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch(e) {
      setError('Invalid Base64 string. Please check your input.');
      setOutput('');
    }
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  function swap()  { setInput(output); setOutput(''); setMode(m => m === 'encode' ? 'decode' : 'encode'); }

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target.result;
      setInput(result);
      setMode('encode');
    };
    reader.readAsDataURL(file);
  }

  return (
    <ToolLayout tool={tool}>
      <div className="card">
        <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
          <div className="pill-tabs">
            <button className={`pill-tab${mode === 'encode' ? ' active' : ''}`} onClick={() => setMode('encode')}>Encode</button>
            <button className={`pill-tab${mode === 'decode' ? ' active' : ''}`} onClick={() => setMode('decode')}>Decode</button>
          </div>
          <label className="btn btn-ghost btn-sm" htmlFor="b64-file" style={{cursor:'pointer'}}>
            📁 From File
            <input type="file" id="b64-file" className="sr-only" onChange={e => handleFile(e.target.files[0])} />
          </label>
        </div>

        <div className="form-group" style={{marginBottom:16}}>
          <label className="form-label" htmlFor="b64-input">{mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}</label>
          <textarea id="b64-input" className="form-textarea" style={{fontFamily:'monospace',fontSize:'.875rem'}}
            value={input} onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text or paste URL…' : 'Enter Base64 string…'}
            spellCheck={false}
          />
        </div>

        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-primary" onClick={process}>{mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}</button>
          {output && <button className="btn btn-ghost" onClick={swap}>⇅ Swap</button>}
        </div>

        {error && <div style={{background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:8,padding:'10px 14px',color:'#991b1b',fontSize:'.875rem',marginTop:12}}>❌ {error}</div>}

        {output && (
          <div style={{marginTop:16}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <label className="form-label">Result</label>
              <button className="btn btn-outline btn-sm" onClick={copy}>{copied ? '✅ Copied!' : '📋 Copy'}</button>
            </div>
            <pre style={{background:'var(--clr-bg)',borderRadius:12,padding:16,fontSize:'.875rem',fontFamily:'monospace',overflowX:'auto',whiteSpace:'pre-wrap',wordBreak:'break-all',maxHeight:300,overflowY:'auto'}}>
              {output}
            </pre>
            <p style={{fontSize:'.8rem',color:'var(--clr-text-3)',marginTop:8}}>
              {output.length} characters
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
