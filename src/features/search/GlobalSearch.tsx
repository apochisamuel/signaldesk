import { useEffect, useRef, useState } from 'react';
import { Dialog } from '../../components/Dialog/Dialog';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { searchCases } from '../../services/caseApi';
import type { CaseRecord } from '../cases/types';
import { SearchResults } from './SearchResults';

export function GlobalSearch({ open, onClose, onChoose }: { open: boolean; onClose: () => void; onChoose: (record: CaseRecord) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CaseRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebouncedValue(query, 180);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!debouncedQuery.trim()) { setResults([]); setLoading(false); return; }
    setLoading(true);
    searchCases(debouncedQuery).then((next) => {
      setResults(next);
      setActiveIndex(0);
    }).finally(() => setLoading(false));
  }, [debouncedQuery, open]);

  const choose = (record: CaseRecord) => {
    onChoose(record);
    setQuery('');
    setResults([]);
    onClose();
  };

  return (
    <Dialog open={open} title="Search SignalDesk" description="Find a case without leaving the current queue." onClose={onClose}>
      <div className="command-search" onKeyDown={(event) => {
        if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, results.length - 1)); }
        if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
        if (event.key === 'Enter' && results[activeIndex]) { event.preventDefault(); choose(results[activeIndex]); }
      }}>
        <SearchInput ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onClear={() => setQuery('')} placeholder="Try “payment” or SD-1024" label="Search all cases" />
        <SearchResults results={results} activeIndex={activeIndex} loading={loading} query={query} onHover={setActiveIndex} onChoose={choose} />
      </div>
    </Dialog>
  );
}
