import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'word-counter');

export default function WordCounter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const words    = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars    = text.length;
  const charsNoS = text.replace(/\s/g,'').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const freq = text.trim()
    ? Object.entries(
        text.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/)
          .filter(w => w.length > 3)
          .reduce((acc, w) => ({ ...acc, [w]: (acc[w] || 0) + 1 }), {})
      ).sort((a,b) => b[1]-a[1]).slice(0, 8)
    : [];

  const stats = [
    { value: words,       label: t('word_count.words') },
    { value: chars,       label: t('word_count.chars') },
    { value: charsNoS,    label: t('word_count.no_spaces') },
    { value: sentences,   label: t('word_count.sentences') },
    { value: paragraphs,  label: t('word_count.paragraphs') },
    { value: `${readingTime} ${t('word_count.min')}`, label: t('word_count.reading') },
  ];

  return (
    <ToolLayout tool={tool}>
      <div className="tool-grid tool-grid-2">
        <div className="card">
          <label className="form-label" htmlFor="wc-input" style={{marginBottom:8}}>{t('word_count.your_text')}</label>
          <textarea id="wc-input" className="form-textarea" style={{minHeight:400,fontSize:'.95rem'}}
            value={text} onChange={e => setText(e.target.value)}
            placeholder={t('word_count.placeholder')}
          />
          {text && (
            <button className="btn btn-ghost btn-sm" style={{marginTop:8,alignSelf:'flex-start'}} onClick={() => setText('')}>{t('common.clear')}</button>
          )}
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="card">
            <h3 style={{fontWeight:700,marginBottom:16}}>{t('word_count.stats')}</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {stats.map(s => (
                <div key={s.label} style={{background:'var(--clr-bg)',borderRadius:12,padding:'16px',textAlign:'center',border:'1px solid var(--clr-border)'}}>
                  <div style={{fontSize:'1.75rem',fontWeight:800,color:'#14b8a6'}}>{s.value}</div>
                  <div style={{fontSize:'.75rem',color:'var(--clr-text-3)',fontWeight:500,marginTop:4}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {freq.length > 0 && (
            <div className="card">
              <h3 style={{fontWeight:700,marginBottom:12}}>{t('word_count.top')}</h3>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {freq.map(([word, count]) => (
                  <div key={word} style={{display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontSize:'.875rem',fontWeight:500,minWidth:80}}>{word}</span>
                    <div style={{flex:1,height:6,background:'var(--clr-border)',borderRadius:3,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${(count/freq[0][1])*100}%`,background:'#14b8a6',borderRadius:3}}/>
                    </div>
                    <span style={{fontSize:'.8rem',color:'var(--clr-text-3)',minWidth:20}}>{count}x</span>
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
