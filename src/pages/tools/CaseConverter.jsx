import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'case-converter');

const CONVERSIONS = {
  'UPPERCASE':   t => t.toUpperCase(),
  'lowercase':   t => t.toLowerCase(),
  'Title Case':  t => t.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()),
  'Sentence case': t => t.replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase()),
  'camelCase':   t => t.trim().split(/[\s_-]+/).map((w,i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join(''),
  'PascalCase':  t => t.trim().split(/[\s_-]+/).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(''),
  'snake_case':  t => t.trim().split(/[\s]+/).join('_').toLowerCase(),
  'kebab-case':  t => t.trim().split(/[\s]+/).join('-').toLowerCase(),
  'aLtErNaTiNg': t => t.split('').map((c,i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''),
};

export default function CaseConverter() {
  const [input, setInput]   = useState('');
  const [copied, setCopied] = useState('');

  function copy(text) { navigator.clipboard.writeText(text); setCopied(text); setTimeout(() => setCopied(''), 2000); }

  return (
    <ToolLayout tool={tool}>
      <div className="card" style={{marginBottom:20}}>
        <div className="form-group">
          <label className="form-label" htmlFor="cc-input">Input Text</label>
          <textarea id="cc-input" className="form-textarea" style={{minHeight:140}}
            value={input} onChange={e => setInput(e.target.value)}
            placeholder="Type or paste your text here…"
          />
        </div>
      </div>

      {input.trim() && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>
          {Object.entries(CONVERSIONS).map(([name, fn]) => {
            const result = fn(input);
            return (
              <div key={name} className="card card-sm" style={{cursor:'pointer'}} onClick={() => copy(result)}>
                <div style={{fontSize:'.7rem',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#a855f7',marginBottom:8}}>{name}</div>
                <div style={{fontSize:'.95rem',fontFamily:'monospace',wordBreak:'break-all',color:'var(--clr-text-1)',marginBottom:12}}>
                  {result}
                </div>
                <button className="btn btn-ghost btn-sm" style={{alignSelf:'flex-start'}}>
                  {copied === result ? '✅ Copied!' : '📋 Copy'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!input.trim() && (
        <div className="card" style={{textAlign:'center',padding:'48px 24px',color:'var(--clr-text-3)'}}>
          <div style={{fontSize:'2.5rem',marginBottom:12}}>Aa</div>
          <p>Type some text above to see all case conversions instantly</p>
        </div>
      )}
    </ToolLayout>
  );
}
