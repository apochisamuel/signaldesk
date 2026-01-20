import { Button } from '../../components/Button/Button';
import { PEOPLE } from '../../services/seedData';
import type { CaseStatus } from './types';

interface Props {
  selectedCount: number;
  busy: boolean;
  onAssign: (ownerId: string | null) => void;
  onSetStatus: (status: CaseStatus) => void;
  onClear: () => void;
}

export function BulkActions({ selectedCount, busy, onAssign, onSetStatus, onClear }: Props) {
  if (selectedCount === 0) return null;
  return (
    <div className="bulk-bar" role="region" aria-label="Bulk actions">
      <strong>{selectedCount} selected</strong>
      <label><span className="sr-only">Assign selected cases</span><select disabled={busy} defaultValue="" onChange={(event) => { if (event.target.value) onAssign(event.target.value === 'none' ? null : event.target.value); event.currentTarget.value = ''; }}>
        <option value="" disabled>Assign…</option><option value="none">Unassigned</option>{PEOPLE.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
      </select></label>
      <label><span className="sr-only">Change selected case status</span><select disabled={busy} defaultValue="" onChange={(event) => { if (event.target.value) onSetStatus(event.target.value as CaseStatus); event.currentTarget.value = ''; }}>
        <option value="" disabled>Status…</option><option value="open">Open</option><option value="in_progress">In progress</option><option value="waiting">Waiting</option><option value="resolved">Resolved</option>
      </select></label>
      <Button variant="ghost" size="sm" onClick={onClear} disabled={busy}>Clear</Button>
      {busy ? <span className="bulk-progress" role="status">Updating selected cases…</span> : null}
    </div>
  );
}
