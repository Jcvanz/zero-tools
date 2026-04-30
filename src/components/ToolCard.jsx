import { Link } from 'react-router-dom';

export default function ToolCard({ tool }) {
  return (
    <Link to={tool.path} className="tool-card" aria-label={`Open ${tool.name}`}>
      <div className="tool-card-icon" style={{ background: tool.colorLight, color: tool.color }}>
        <span>{tool.icon}</span>
      </div>
      <div className="tool-card-body">
        <span className="tool-card-cat">{tool.category}</span>
        <h3 className="tool-card-name">{tool.name}</h3>
        <p className="tool-card-desc">{tool.desc}</p>
      </div>
      <div className="tool-card-arrow" aria-hidden="true">→</div>

      <style>{`
        .tool-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: white;
          border: 1px solid var(--clr-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          color: var(--clr-text-1);
          text-decoration: none;
          transition: transform var(--t-base), box-shadow var(--t-base), border-color var(--t-base);
          position: relative;
          overflow: hidden;
        }
        .tool-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, ${tool.colorLight} 0%, transparent 60%);
          opacity: 0;
          transition: opacity var(--t-base);
        }
        .tool-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: ${tool.color}44;
        }
        .tool-card:hover::before { opacity: 1; }
        .tool-card:hover .tool-card-arrow { opacity: 1; transform: translateX(0); }

        .tool-card-icon {
          width: 48px; height: 48px; flex-shrink: 0;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem; font-weight: 800;
          position: relative;
        }
        .tool-card-body { flex: 1; min-width: 0; position: relative; }
        .tool-card-cat {
          font-size: .7rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          color: ${tool.color};
          display: block; margin-bottom: 4px;
        }
        .tool-card-name { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
        .tool-card-desc { font-size: .85rem; color: var(--clr-text-2); line-height: 1.55; }

        .tool-card-arrow {
          font-size: 1.1rem;
          color: ${tool.color};
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity var(--t-base), transform var(--t-base);
          align-self: center;
          flex-shrink: 0;
          position: relative;
        }
      `}</style>
    </Link>
  );
}
