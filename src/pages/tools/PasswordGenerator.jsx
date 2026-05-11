import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'password-generator');

const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export default function PasswordGenerator() {
  const { t } = useTranslation();
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: false });
  const [password, setPassword] = useState('');
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(1);

  function generate() {
    const charset = Object.entries(opts).filter(([,v]) => v).map(([k]) => CHARS[k]).join('');
    if (!charset) return;
    const passwords = Array.from({length: count}, () =>
      Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('')
    );
    setPassword(passwords[0]);
    setHistory(h => [passwords[0], ...h].slice(0, 10));
    setCopied(false);
  }

  function strength() {
    if (!password) return { label: '—', color: '#9ca3af', width: '0%' };
    let score = 0;
    if (opts.upper) score++;
    if (opts.lower) score++;
    if (opts.numbers) score++;
    if (opts.symbols) score += 2;
    if (length >= 12) score++;
    if (length >= 20) score++;
    const levels = [
      { label: t('pwd_gen.weak'), color: '#ef4444', width: '25%' },
      { label: t('pwd_gen.fair'), color: '#f59e0b', width: '50%' },
      { label: t('pwd_gen.good'), color: '#10b981', width: '75%' },
      { label: t('pwd_gen.strong'), color: '#6366f1', width: '100%' },
    ];
    return levels[Math.min(Math.floor((score-1)/1.5), 3)] || levels[0];
  }

  function copy(p = password) {
    navigator.clipboard.writeText(p);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const s = strength();

  return (
    <ToolLayout tool={tool}>
      <div className="tool-grid tool-grid-2">
        <div className="card">
          <div className="form-group" style={{marginBottom:20}}>
            <label className="form-label" htmlFor="pw-length">{t('pwd_gen.length')} <strong>{length}</strong></label>
            <input type="range" id="pw-length" min="6" max="64" value={length}
              onChange={e => { setLength(+e.target.value); e.target.style.setProperty('--pct',`${((+e.target.value-6)/58)*100}%`); }}
              style={{'--pct': `${((length-6)/58)*100}%`}}
            />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'.8rem',color:'var(--clr-text-3)'}}><span>6</span><span>64</span></div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
            {Object.entries(opts).map(([key, val]) => (
              <label key={key} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:'.9rem',fontWeight:500}}>
                <input type="checkbox" checked={val} onChange={e => setOpts(o => ({...o, [key]: e.target.checked}))} />
                {t(`pwd_gen.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}
              </label>
            ))}
          </div>

          <div className="form-group" style={{marginBottom:20}}>
            <label className="form-label" htmlFor="pw-count">{t('pwd_gen.generate')} <strong>{count}</strong> {count > 1 ? t('pwd_gen.pwds') : t('pwd_gen.pwd')}</label>
            <input type="range" id="pw-count" min="1" max="10" value={count}
              onChange={e => { setCount(+e.target.value); e.target.style.setProperty('--pct',`${((+e.target.value-1)/9)*100}%`); }}
              style={{'--pct': `${((count-1)/9)*100}%`}}
            />
          </div>

          <button className="btn btn-primary btn-full" onClick={generate}>{t('pwd_gen.btn')}</button>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {password && (
            <div className="card">
              <div style={{position:'relative',marginBottom:12}}>
                <div style={{fontFamily:'monospace',fontSize:'1.1rem',fontWeight:700,letterSpacing:'.05em',wordBreak:'break-all',padding:'16px',background:'var(--clr-bg)',borderRadius:12,border:'1px solid var(--clr-border)',paddingRight:100}}>
                  {password}
                </div>
                <button className="btn btn-outline btn-sm copy-btn" onClick={() => copy()}>
                  {copied ? t('pwd_gen.copied') : t('pwd_gen.copy')}
                </button>
              </div>

              {/* Strength meter */}
              <div style={{marginBottom:4,display:'flex',justifyContent:'space-between',fontSize:'.8rem',fontWeight:600}}>
                <span style={{color:'var(--clr-text-3)'}}>{t('pwd_gen.strength')}</span>
                <span style={{color: s.color}}>{s.label}</span>
              </div>
              <div style={{height:6,background:'var(--clr-border)',borderRadius:3,overflow:'hidden'}}>
                <div style={{height:'100%',width:s.width,background:s.color,borderRadius:3,transition:'width .4s ease, background .4s ease'}}/>
              </div>
            </div>
          )}

          {history.length > 1 && (
            <div className="card">
              <h3 style={{fontSize:'.85rem',fontWeight:700,color:'var(--clr-text-3)',marginBottom:12}}>{t('pwd_gen.recent')}</h3>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {history.slice(1).map((p,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:'var(--clr-bg)',borderRadius:8}}>
                    <span style={{flex:1,fontFamily:'monospace',fontSize:'.85rem',wordBreak:'break-all',color:'var(--clr-text-2)'}}>{p}</span>
                    <button className="btn btn-ghost btn-sm" style={{padding:'4px 8px'}} onClick={() => copy(p)}>📋</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
