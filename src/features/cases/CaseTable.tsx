import { Checkbox } from '../../components/Checkbox/Checkbox';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Spinner } from '../../components/Spinner/Spinner';
import { visibleSelectionState } from './caseSelectors';
import { CaseTableRow } from './CaseTableRow';
import type { CaseRecord } from './types';

interface Props {
  items: CaseRecord[];
  loading: boolean;
  selectedIds: Set<string>;
  onToggleSelected: (id: string) => void;
  onToggleVisible: (ids: string[]) => void;
  onOpen: (id: string) => void;
}

export function CaseTable({ items, loading, selectedIds, onToggleSelected, onToggleVisible, onOpen }: Props) {
  const selection = visibleSelectionState(items, selectedIds);
  if (!loading && items.length === 0) return <EmptyState title="No cases found" description="Try a different search or remove one of the active filters." />;
  return (
    <div className="table-wrap" aria-busy={loading}>
      {loading ? <div className="table-loading"><Spinner label="Loading cases" /> Refreshing cases…</div> : null}
      <table className="case-table">
        <thead><tr>
          <th className="select-cell"><Checkbox checked={selection.all} indeterminate={selection.some} onChange={() => onToggleVisible(items.map((item) => item.id))} aria-label="Select visible cases" /></th>
          <th>Case</th><th>Owner</th><th>Status</th><th>Priority</th><th>Updated</th>
        </tr></thead>
        <tbody>{items.map((record) => <CaseTableRow key={record.id} record={record} selected={selectedIds.has(record.id)} onToggle={() => onToggleSelected(record.id)} onOpen={() => onOpen(record.id)} />)}</tbody>
      </table>
    </div>
  );
}
