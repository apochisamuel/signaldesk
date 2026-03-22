import type { CaseRecord } from '../cases/types';

export function SearchResults({ results, activeIndex, loading, query, onHover, onChoose }: { results: CaseRecord[]; activeIndex: number; loading: boolean; query: string; onHover: (index: number) => void; onChoose: (record: CaseRecord) => void }) {
  if (!query.trim()) return <div className="command-hint">Type a case ID, title, or description.</div>;
  if (loading && results.length === 0) return <div className="command-hint" role="status">Searching cases…</div>;
  if (!loading && results.length === 0) return <div className="command-hint">No matching cases.</div>;
  return (
    <ul className="search-results" role="listbox" aria-label="Search results">
      {results.map((record, index) => (
        <li key={record.id} role="option" aria-selected={index === activeIndex}>
          <button type="button" className={index === activeIndex ? 'active' : ''} onMouseMove={() => onHover(index)} onClick={() => onChoose(record)}>
            <span className="result-id">{record.id}</span><span className="result-copy"><strong>{record.title}</strong><small>{record.tags.join(' · ')}</small></span><span className={`priority priority-${record.priority}`}>{record.priority}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
