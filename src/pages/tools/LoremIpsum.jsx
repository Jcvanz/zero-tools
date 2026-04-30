import { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'lorem-ipsum');

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip commodo consequat duis aute irure dolor reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim est laborum curabitur pretium tincidunt lacus nulla gravida orci lobortis rhoncus enim pellentesque augue cursus malesuada phasellus ultrices odio volutpat porttitor'.split(' ');

function randomWord() { return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]; }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function generateSentence() {
  const len = 8 + Math.floor(Math.random() * 10);
  return capitalize(Array.from({length:len}, randomWord).join(' ')) + '.';
}

function generateParagraph(sentences = 5) {
  return Array.from({length: sentences}, generateSentence).join(' ');
}

export default function LoremIpsum() {
  const [type, setType]   = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  function generate() {
    let result = '';
    if (type === 'paragraphs') result = Array.from({length:count}, () => generateParagraph()).join('\n\n');
    if (type === 'sentences')  result = Array.from({length:count}, generateSentence).join(' ');
    if (type === 'words')      result = Array.from({length:count}, randomWord).join(' ');
    setOutput(result); setCopied(false);
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  const maxMap = { paragraphs: 20, sentences: 50, words: 500 };

  return (
    <ToolLayout tool={tool}>
      <div className="card">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
          <div className="form-group">
            <label className="form-label">Generate</label>
            <div className="pill-tabs">
              {['paragraphs','sentences','words'].map(t => (
                <button key={t} className={`pill-tab${type === t ? ' active' : ''}`} onClick={() => { setType(t); setCount(3); }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="li-count">Amount: <strong>{count}</strong></label>
            <input type="range" id="li-count" min="1" max={maxMap[type]} value={Math.min(count, maxMap[type])}
              onChange={e => { setCount(+e.target.value); e.target.style.setProperty('--pct',`${((+e.target.value-1)/(maxMap[type]-1))*100}%`); }}
              style={{'--pct': `${((count-1)/(maxMap[type]-1))*100}%`}}
            />
          </div>
        </div>
        <button className="btn btn-primary btn-full" onClick={generate}>📝 Generate Text</button>
      </div>

      {output && (
        <div className="card" style={{marginTop:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <span style={{fontSize:'.85rem',color:'var(--clr-text-3)'}}>{output.split(/\s+/).length} words · {output.length} characters</span>
            <button className="btn btn-outline btn-sm" onClick={copy}>{copied ? '✅ Copied!' : '📋 Copy'}</button>
          </div>
          <div style={{background:'var(--clr-bg)',borderRadius:12,padding:20,fontSize:'.95rem',lineHeight:1.8,color:'var(--clr-text-2)',maxHeight:400,overflowY:'auto',whiteSpace:'pre-wrap'}}>
            {output}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
