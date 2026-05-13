import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'color-palette');

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max+min)/2;
  if (max === min) { h = s = 0; } else {
    const d = max - min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch(max) { case r: h=(g-b)/d+(g<b?6:0); break; case g: h=(b-r)/d+2; break; case b: h=(r-g)/d+4; break; }
    h /= 6;
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h/30) % 12;
  const a = s * Math.min(l, 1-l);
  const f = n => l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1)));
  return '#' + [f(0),f(8),f(4)].map(x => Math.round(x*255).toString(16).padStart(2,'0')).join('');
}

function generatePalette(baseHex, mode) {
  const [h, s, l] = hexToHsl(baseHex);

  // Garante 5 luminosidades diferentes incluindo a cor base
  const getMonochromatic = (baseL) => {
    let pool = [15, 30, 50, 70, 85];
    let closest = 0, minDiff = 100;
    pool.forEach((lvl, i) => {
      if (Math.abs(lvl - baseL) < minDiff) { minDiff = Math.abs(lvl - baseL); closest = i; }
    });
    pool[closest] = baseL;
    return pool;
  };

  // Garante luminosidades diferentes da cor base (para complementares e triádicas)
  const getOtherLightnesses = (baseL) => {
    let pool = [15, 30, 45, 60, 75, 90];
    pool.sort((a,b) => Math.abs(a-baseL) - Math.abs(b-baseL));
    pool.shift(); // Remove a luminosidade mais próxima da base
    return pool.sort((a,b) => a-b);
  };

  switch(mode) {
    case 'analogous':   
      if (s < 10) return getMonochromatic(l).map(lvl => hslToHex(h, s, lvl));
      return [
        baseHex,
        hslToHex((h+30)%360, s, l), 
        hslToHex((h-30+360)%360, s, l), 
        hslToHex((h+60)%360, s, l), 
        hslToHex((h-60+360)%360, s, l)
      ];
    
    case 'complementary': {
      const others = getOtherLightnesses(l);
      return [
        baseHex, 
        hslToHex((h+180)%360, s, l), 
        hslToHex(h, s, others[1]), 
        hslToHex((h+180)%360, s, others[3]), 
        hslToHex((h+180)%360, s, others[4])
      ];
    }
    case 'triadic': {
      const others = getOtherLightnesses(l);
      return [
        baseHex, 
        hslToHex((h+120)%360, s, l), 
        hslToHex((h+240)%360, s, l), 
        hslToHex(h, s, others[1]), 
        hslToHex((h+120)%360, s, others[4])
      ];
    }
    case 'monochromatic': {
      return getMonochromatic(l).map(lvl => hslToHex(h, s, lvl));
    }
    default: return [baseHex];
  }
}

export default function ColorPalette() {
  const { t } = useTranslation();
  const [base, setBase]     = useState('#6366f1');
  const [mode, setMode]     = useState('analogous');
  const [palette, setPalette] = useState([]);
  const [copied, setCopied]  = useState('');

  function generate() { setPalette(generatePalette(base, mode)); }

  function copy(text) {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 1500);
  }

  const modes = ['analogous','complementary','triadic','monochromatic'];

  return (
    <ToolLayout tool={tool}>
      <div className="card" style={{marginBottom:20}}>
        <div style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:16,alignItems:'end',marginBottom:20}}>
          <div className="form-group">
            <label className="form-label" htmlFor="cp-color">{t('color_pal.base')}</label>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <input type="color" id="cp-color" value={base} onChange={e => setBase(e.target.value)} style={{width:52,height:52,border:'2px solid var(--clr-border)',borderRadius:12,cursor:'pointer',padding:4}} />
              <input className="form-input" value={base} onChange={e => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && setBase(e.target.value)} style={{width:120}} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t('color_pal.mode')}</label>
            <div className="pill-tabs" style={{flexWrap:'wrap'}}>
              {modes.map(m => (
                <button key={m} className={`pill-tab${mode === m ? ' active' : ''}`} onClick={() => setMode(m)}>
                  {t(`color_pal.${m}`, m.charAt(0).toUpperCase() + m.slice(1))}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="btn btn-primary btn-full" onClick={generate}>{t('color_pal.btn')}</button>
      </div>

      {palette.length > 0 && (
        <div className="card">
          <div style={{display:'flex',gap:0,borderRadius:12,overflow:'hidden',marginBottom:20,height:120}}>
            {palette.map((c,i) => <div key={i} style={{flex:1,background:c,cursor:'pointer',transition:'flex .2s'}} title={c} onClick={() => copy(c)} />)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:12}}>
            {palette.map((c,i) => {
              const [h,s,l] = hexToHsl(c);
              return (
                <div key={i} className="card card-sm" style={{textAlign:'center',cursor:'pointer',transition:'transform var(--t-base)'}} onClick={() => copy(c)}>
                  <div style={{width:48,height:48,borderRadius:12,background:c,margin:'0 auto 12px',border:'2px solid var(--clr-border)'}}/>
                  <div style={{fontFamily:'monospace',fontWeight:700,fontSize:'.9rem'}}>{copied === c ? t('color_pal.copied') : c.toUpperCase()}</div>
                  <div style={{fontSize:'.75rem',color:'var(--clr-text-3)',marginTop:4}}>hsl({h}, {s}%, {l}%)</div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-outline btn-sm" style={{marginTop:16}} onClick={() => copy(palette.join(', '))}>
            {t('color_pal.copy_all')}
          </button>
        </div>
      )}
    </ToolLayout>
  );
}
