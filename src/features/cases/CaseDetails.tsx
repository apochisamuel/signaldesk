import { PEOPLE } from '../../services/seedData';
import { titleCase } from '../../utils/text';
import type { CasePatch, CaseRecord, CaseStatus, Priority } from './types';

export function CaseDetails({ record, disabled, onPatch }: { record: CaseRecord; disabled: boolean; onPatch: (patch: CasePatch) => void }) {
  return (
    <section className="case-metadata" aria-label="Case attributes">
      <label><span>Status</span><select disabled={disabled} value={record.status} onChange={(event) => onPatch({ status: event.target.value as CaseStatus })}>{(['open','in_progress','waiting','resolved'] as CaseStatus[]).map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
      <label><span>Priority</span><select disabled={disabled} value={record.priority} onChange={(event) => onPatch({ priority: event.target.value as Priority })}>{(['low','medium','high','urgent'] as Priority[]).map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
      <label><span>Owner</span><select disabled={disabled} value={record.ownerId ?? ''} onChange={(event) => onPatch({ ownerId: event.target.value || null })}><option value="">Unassigned</option>{PEOPLE.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select></label>
      <div className="meta-row"><span>Tags</span><div className="tag-list">{record.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
      <div className="meta-row"><span>Revision</span><strong>{record.revision}</strong></div>
    </section>
  );
}
