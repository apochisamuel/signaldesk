import { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import type { CaseRecord } from './types';

export function CaseEditor({ record, saving, onSave }: { record: CaseRecord; saving: boolean; onSave: (description: string) => Promise<void> }) {
  const [description, setDescription] = useState(record.description);
  useEffect(() => { setDescription(record.description); }, [record.id, record.description]);
  const dirty = description !== record.description;
  return (
    <section className="detail-section" aria-labelledby="description-heading">
      <div className="section-heading"><h3 id="description-heading">Description</h3>{dirty ? <span className="unsaved-badge">Unsaved</span> : null}</div>
      <textarea rows={5} value={description} onChange={(event) => setDescription(event.target.value)} aria-label="Case description" />
      <div className="editor-actions"><Button size="sm" variant="primary" disabled={!dirty || saving || !description.trim()} onClick={() => void onSave(description.trim())}>{saving ? 'Saving…' : 'Save description'}</Button></div>
    </section>
  );
}
