import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'json-formatter');

export default function JSONFormatter() {
  const { t } = useTranslation();
  const [input, setInput]  = useState('');
  const [output, setOutput] = useState('');
  const [error, setError]   = useState('');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  function format() {
    try { setOutput(JSON.stringify(JSON.parse(input), null, indent)); setError(''); } catch(e) { setError(e.message); setOutput(''); }
  }
  function minify() {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError(''); } catch(e) { setError(e.message); setOutput(''); }
  }
  function validate() {
    try { JSON.parse(input); setError(''); setOutput(t('json_fmt.valid')); } catch(e) { setError(e.message); setOutput(''); }
  }
  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <ToolLayout tool={tool}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <label className="form-label" htmlFor="jf-input">{t('json_fmt.input')}</label>
            <button className="btn btn-ghost btn-sm" onClick={() => { setInput(''); setOutput(''); setError(''); }}>{t('common.clear')}</button>
          </div>
          <textarea id="jf-input" className="form-textarea" style={{minHeight:320,fontFamily:'monospace',fontSize:'.875rem'}}
            value={input} onChange={e => setInput(e.target.value)}
            placeholder={'{\n  "name": "ZeroTools",\n  "free": true\n}'}
            spellCheck={false}
          />
          <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,flex:1}}>
              <label style={{fontSize:'.85rem',fontWeight:600,whiteSpace:'nowrap'}}>{t('json_fmt.indent')}</label>
              {[2,4,'tab'].map(v => (
                <button key={v} className={`pill-tab${indent === v ? ' active' : ''}`} onClick={() => setIndent(v === 'tab' ? '\t' : v)}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={format}>{t('json_fmt.format')}</button>
            <button className="btn btn-outline" onClick={minify}>{t('json_fmt.minify')}</button>
            <button className="btn btn-ghost" onClick={validate}>{t('json_fmt.validate')}</button>
          </div>
        </div>

        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <label className="form-label">{t('json_fmt.output')}</label>
            {output && <button className="btn btn-outline btn-sm" onClick={copy}>{copied ? t('color_pal.copied') : t('common.copy')}</button>}
          </div>
          {error && <div style={{background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:8,padding:'10px 14px',color:'#991b1b',fontSize:'.875rem',marginBottom:12,fontFamily:'monospace'}}>❌ {error}</div>}
          <pre style={{background:'var(--clr-bg)',borderRadius:12,padding:16,fontSize:'.875rem',lineHeight:1.7,minHeight:320,overflowX:'auto',fontFamily:'monospace',color: output.startsWith('✅') ? '#065f46' : 'var(--clr-text-1)',whiteSpace:'pre-wrap',wordBreak:'break-all'}}>
            {output || <span style={{color:'var(--clr-text-3)'}}>{t('json_fmt.placeholder')}</span>}
          </pre>
        </div>
      </div>
    </ToolLayout>
  );
}
