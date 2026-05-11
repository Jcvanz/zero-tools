import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'hashtag-generator');

const HASHTAG_DB = {
  Fashion: ['#fashion','#style','#ootd','#fashionista','#trendy','#outfitoftheday','#fashionblogger','#streetstyle','#lookoftheday','#fashionweek','#instafashion','#chic','#model','#clothing','#aesthetic'],
  Food: ['#food','#foodie','#foodphotography','#instafood','#yummy','#delicious','#foodblogger','#homemade','#cooking','#recipe','#foodstagram','#eat','#tasty','#healthyfood','#lunch'],
  Travel: ['#travel','#travelgram','#wanderlust','#explore','#adventure','#vacation','#travelphotography','#trip','#tourist','#landscape','#nature','#traveling','#instatravel','#holiday','#roadtrip'],
  Fitness: ['#fitness','#gym','#workout','#motivation','#fit','#health','#training','#bodybuilding','#lifestyle','#exercise','#fitnessmotivation','#strong','#healthy','#fitnessjourney','#gains'],
  Business: ['#business','#entrepreneur','#marketing','#success','#startup','#motivation','#hustle','#smallbusiness','#branding','#socialmedia','#digitalmarketing','#ceo','#growth','#invest','#ecommerce'],
  Photography: ['#photography','#photo','#photographer','#photooftheday','#picoftheday','#instagram','#beautiful','#nature','#portrait','#canon','#nikon','#landscape','#art','#creative','#lightroom'],
  TikTok: ['#fyp','#foryoupage','#viral','#trending','#tiktok','#foryou','#tiktokviral','#explore','#duet','#comedy','#funny','#relatable','#trend','#xyzbca','#capcut'],
  Shopify: ['#shopify','#ecommerce','#onlineshop','#onlineshopping','#shopifystore','#dropshipping','#shopifyseller','#smallbusiness','#entrepreneur','#handmade','#shoplocal','#etsy','#newproduct','#sale','#discount'],
};

export default function HashtagGenerator() {
  const { t } = useTranslation();
  const [category, setCategory] = useState('Fashion');
  const [custom, setCustom] = useState('');
  const [count, setCount] = useState(15);
  const [generated, setGenerated] = useState([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    let base = [...(HASHTAG_DB[category] || [])];
    if (custom.trim()) {
      const customs = custom.split(/[\s,]+/).filter(Boolean).map(h => h.startsWith('#') ? h : `#${h}`);
      base = [...customs, ...base];
    }
    const shuffled = base.sort(() => Math.random() - 0.5);
    setGenerated(shuffled.slice(0, count));
    setCopied(false);
  }

  function copy() {
    navigator.clipboard.writeText(generated.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolLayout tool={tool}>
      <div className="card">
        <div className="hg-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="hg-category">{t('ht_gen.category')}</label>
            <select id="hg-category" className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
              {Object.keys(HASHTAG_DB).map(c => <option key={c} value={c}>{t(`ht_gen.${c}`, c)}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="hg-custom">{t('ht_gen.custom_kw')}</label>
            <input id="hg-custom" className="form-input" placeholder={t('ht_gen.custom_ph')} value={custom} onChange={e => setCustom(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="hg-count">{t('ht_gen.number')} <strong>{count}</strong></label>
            <input type="range" id="hg-count" min="5" max="30" value={count}
              onChange={e => { setCount(+e.target.value); e.target.style.setProperty('--pct', `${((+e.target.value-5)/25)*100}%`); }}
              style={{'--pct': `${((count-5)/25)*100}%`}}
            />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'.8rem',color:'var(--clr-text-3)'}}>
              <span>5</span><span>30</span>
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-full" style={{marginTop:24}} onClick={generate}>
          {t('ht_gen.btn')}
        </button>
      </div>

      {generated.length > 0 && (
        <div className="card" style={{marginTop:20}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h3 style={{fontSize:'1rem',fontWeight:700}}>{t('ht_gen.your_ht')} ({generated.length})</h3>
            <button className="btn btn-outline btn-sm" onClick={copy}>
              {copied ? t('ht_gen.copied') : t('ht_gen.copy_all')}
            </button>
          </div>
          <div className="hashtag-cloud">
            {generated.map((h, i) => (
              <span key={i} className="hashtag-chip" onClick={() => { navigator.clipboard.writeText(h); }}>
                {h}
              </span>
            ))}
          </div>
          <p style={{fontSize:'.8rem',color:'var(--clr-text-3)',marginTop:12}}>
            {t('ht_gen.click')} {generated.join(' ').length} {t('ht_gen.chars')}
          </p>
        </div>
      )}

      <style>{`
        .hg-grid { display: grid; gap: 20px; }
        .hashtag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
        .hashtag-chip {
          padding: 6px 14px;
          background: #fdf2f8; color: #be185d;
          border-radius: var(--radius-full);
          font-size: .875rem; font-weight: 600;
          cursor: pointer;
          transition: transform var(--t-fast), background var(--t-fast);
          border: 1px solid #fbcfe8;
        }
        .hashtag-chip:hover { background: #fce7f3; transform: scale(1.05); }
      `}</style>
    </ToolLayout>
  );
}
