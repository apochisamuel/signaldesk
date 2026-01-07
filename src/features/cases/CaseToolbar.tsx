import { SearchInput } from '../../components/SearchInput/SearchInput';
import type { SortDirection, SortKey } from './types';

export function CaseToolbar({ query, onQueryChange, sortKey, sortDirection, onSortChange }: { query: string; onQueryChange: (value: string) => void; sortKey: SortKey; sortDirection: SortDirection; onSortChange: (key: SortKey, direction: SortDirection) => void }) {
  return (
    <div className="case-toolbar">
      <SearchInput value={query} onChange={(event) => onQueryChange(event.target.value)} onClear={() => onQueryChange('')} placeholder="Search title, ID, tag…" />
      <label className="sort-control"><span className="sr-only">Sort cases</span><select value={`${sortKey}:${sortDirection}`} onChange={(event) => {
        const [key, direction] = event.target.value.split(':') as [SortKey, SortDirection];
        onSortChange(key, direction);
      }}>
        <option value="updatedAt:desc">Recently updated</option><option value="updatedAt:asc">Oldest updated</option><option value="createdAt:desc">Newest created</option><option value="priority:desc">Highest priority</option><option value="title:asc">Title A–Z</option>
      </select></label>
    </div>
  );
}
