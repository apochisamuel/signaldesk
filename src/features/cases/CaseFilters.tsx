import { PEOPLE } from '../../services/seedData';
import type { CaseFiltersState } from './types';

interface Props {
  filters: CaseFiltersState;
  onChange: (filters: CaseFiltersState) => void;
}

const tags = ['payments', 'accounts', 'shipping', 'billing', 'workspace', 'exports', 'search', 'mobile'];

export function CaseFilters({ filters, onChange }: Props) {
  const set = <K extends keyof CaseFiltersState>(key: K, value: CaseFiltersState[K]) => onChange({ ...filters, [key]: value });
  return (
    <div className="filter-row" aria-label="Case filters">
      <label><span>Status</span><select value={filters.status} onChange={(event) => set('status', event.target.value as CaseFiltersState['status'])}>
        <option value="all">All statuses</option><option value="open">Open</option><option value="in_progress">In progress</option><option value="waiting">Waiting</option><option value="resolved">Resolved</option>
      </select></label>
      <label><span>Priority</span><select value={filters.priority} onChange={(event) => set('priority', event.target.value as CaseFiltersState['priority'])}>
        <option value="all">All priorities</option><option value="urgent">Urgent</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
      </select></label>
      <label><span>Owner</span><select value={filters.ownerId} onChange={(event) => set('ownerId', event.target.value)}>
        <option value="all">All owners</option><option value="unassigned">Unassigned</option>{PEOPLE.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
      </select></label>
      <label><span>Tag</span><select value={filters.tag} onChange={(event) => set('tag', event.target.value)}>
        <option value="all">All tags</option>{tags.map((tag) => <option key={tag} value={tag}>{tag}</option>)}
      </select></label>
    </div>
  );
}
