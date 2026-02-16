import { useEffect, useState } from 'react';
import { Drawer } from '../../components/Drawer/Drawer';
import { Button } from '../../components/Button/Button';
import { addCaseNote, requestCase, updateCase } from '../../services/caseApi';
import type { CasePatch, CaseRecord } from './types';
import { CaseActivity } from './CaseActivity';
import { CaseDetails } from './CaseDetails';
import { CaseEditor } from './CaseEditor';

interface Props {
  caseId: string | null;
  onClose: () => void;
  onUpdated: (record: CaseRecord) => void;
  onNotify: (tone: 'success' | 'error' | 'info', message: string) => void;
}

export function CaseDrawer({ caseId, onClose, onUpdated, onNotify }: Props) {
  const [record, setRecord] = useState<CaseRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!caseId) { setRecord(null); return; }
    let active = true;
    setLoading(true);
    requestCase(caseId).then((next) => { if (active) setRecord(next); }).catch(() => { if (active) onNotify('error', 'Could not load case details.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [caseId, onNotify]);

  const applyPatch = async (patch: CasePatch) => {
    if (!record) return;
    const before = record;
    const optimistic = { ...record, ...patch, revision: record.revision + 1 };
    setRecord(optimistic);
    onUpdated(optimistic);
    setSaving(true);
    try {
      const saved = await updateCase(record.id, patch);
      setRecord(saved); onUpdated(saved); onNotify('success', `${record.id} updated.`);
    } catch {
      setRecord(before); onUpdated(before); onNotify('error', `Could not update ${record.id}. Changes were reverted.`);
    } finally { setSaving(false); }
  };

  const submitNote = async () => {
    if (!record || !note.trim()) return;
    setSaving(true);
    try {
      const saved = await addCaseNote(record.id, note.trim());
      setRecord(saved); onUpdated(saved); setNote(''); onNotify('success', 'Note added.');
    } catch { onNotify('error', 'Could not add note.'); }
    finally { setSaving(false); }
  };

  return (
    <Drawer open={Boolean(caseId)} title={record ? `${record.id} · ${record.title}` : 'Case details'} onClose={onClose}>
      {loading && !record ? <p role="status">Loading case details…</p> : null}
      {record ? <>
        <CaseDetails record={record} disabled={saving} onPatch={(patch) => void applyPatch(patch)} />
        <CaseEditor record={record} saving={saving} onSave={(description) => applyPatch({ description })} />
        <section className="detail-section" aria-labelledby="note-heading"><h3 id="note-heading">Add note</h3><textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Share context with the team…" aria-label="New activity note" /><div className="editor-actions"><Button size="sm" variant="primary" disabled={saving || !note.trim()} onClick={() => void submitNote()}>Add note</Button></div></section>
        <CaseActivity entries={record.activity} />
      </> : null}
    </Drawer>
  );
}
