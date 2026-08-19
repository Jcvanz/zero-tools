import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'qr-code');

export default function QRCodeGenerator() {
  const { t } = useTranslation();
  const [value, setValue] = useState('https://myzerotools.online');
  const [size, setSize]   = useState(256);
  const [fg, setFg]       = useState('#111827');
  const [bg, setBg]       = useState('#ffffff');
  const [type, setType]   = useState('url');

  const templates = {
    url:  'https://',
    text: '',
    wifi: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;',
    email: 'mailto:name@example.com',
    phone: 'tel:+1234567890',
  };

  function handleTypeChange(t) {
    setType(t);
    setValue(templates[t]);
  }

  function download() {
    const canvas = document.querySelector('#qr-canvas canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode-zerotools.png';
    a.click();
  }

  return (
    <ToolLayout tool={tool}>
      <div className="tool-grid tool-grid-2">
        <div className="card">
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
            {Object.keys(templates).map(t => (
              <button key={t} className={`pill-tab${type === t ? ' active' : ''}`} onClick={() => handleTypeChange(t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="form-group" style={{marginBottom:16}}>
            <label className="form-label" htmlFor="qr-value">{t('qr_code.content')}</label>
            <textarea
              id="qr-value"
              className="form-textarea"
              value={value}
              onChange={e => setValue(e.target.value)}
              rows={3}
              placeholder={t('qr_code.placeholder')}
            />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
            <div className="form-group">
              <label className="form-label" htmlFor="qr-fg">{t('qr_code.fg')}</label>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <input type="color" id="qr-fg" value={fg} onChange={e => setFg(e.target.value)} style={{width:40,height:40,border:'2px solid var(--clr-border)',borderRadius:8,cursor:'pointer',padding:2}} />
                <input className="form-input" value={fg} onChange={e => setFg(e.target.value)} style={{flex:1}} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="qr-bg">{t('qr_code.bg')}</label>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <input type="color" id="qr-bg" value={bg} onChange={e => setBg(e.target.value)} style={{width:40,height:40,border:'2px solid var(--clr-border)',borderRadius:8,cursor:'pointer',padding:2}} />
                <input className="form-input" value={bg} onChange={e => setBg(e.target.value)} style={{flex:1}} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="qr-size">{t('qr_code.size')} <strong>{size}px</strong></label>
            <input type="range" id="qr-size" min="128" max="512" step="32" value={size}
              onChange={e => { setSize(+e.target.value); e.target.style.setProperty('--pct',`${((+e.target.value-128)/384)*100}%`); }}
              style={{'--pct': `${((size-128)/384)*100}%`}}
            />
          </div>
        </div>

        <div className="card" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:20}}>
          <h3 style={{fontWeight:700,fontSize:'1rem',alignSelf:'flex-start'}}>{t('qr_code.preview')}</h3>
          <div id="qr-canvas" style={{padding:16,background:bg,borderRadius:12,border:'1px solid var(--clr-border)'}}>
            {value.trim() ? (
              <QRCodeCanvas value={value} size={Math.min(size, 280)} fgColor={fg} bgColor={bg} level="H" />
            ) : (
              <div style={{width:200,height:200,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--clr-text-3)',fontSize:'.85rem',textAlign:'center'}}>
                {t('qr_code.empty')}
              </div>
            )}
          </div>
          {value.trim() && (
            <button className="btn btn-success btn-full" onClick={download}>
              {t('qr_code.download')}
            </button>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
