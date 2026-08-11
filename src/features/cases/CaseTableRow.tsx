import { Checkbox } from '../../components/Checkbox/Checkbox';
import { relativeTime } from '../../utils/dates';
import { titleCase } from '../../utils/text';
import { PEOPLE } from '../../services/seedData';
import type { CaseRecord } from './types';

export function CaseTableRow({ record, selected, onToggle, onOpen }: { record: CaseRecord; selected: boolean; onToggle: () => void; onOpen: () => void }) {
  const owner = PEOPLE.find((person) => person.id === record.ownerId);
  return (
    <tr className={selected ? 'selected-row' : ''}>
      <td className="select-cell"><Checkbox checked={selected} onChange={onToggle} aria-label={`Select ${record.id}`} /></td>
      <td><button type="button" className="case-title-button" onClick={onOpen}><span className="case-title-cell"><strong>{record.title}</strong><span>{record.id} · {record.tags.join(' · ')}</span></span></button></td>
      <td>{owner ? <span className="owner-chip"><span className="owner-avatar" aria-hidden="true">{owner.initials}</span>{owner.name}</span> : <span className="muted">Unassigned</span>}</td>
      <td><span className={`status status-${record.status}`}>{titleCase(record.status)}</span></td>
      <td><span className={`priority priority-${record.priority}`}>{titleCase(record.priority)}</span></td>
      <td className="age-cell">{relativeTime(record.updatedAt, Date.parse('2026-08-17T08:00:00Z'))}</td>
    </tr>
  );
}
