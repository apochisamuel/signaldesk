import type { CasePatch, CaseRecord } from '../features/cases/types';
import { makeSeedCases } from './seedData';

let records: CaseRecord[] = makeSeedCases();

function cloneCase(record: CaseRecord): CaseRecord {
  return {
    ...record,
    tags: [...record.tags],
    activity: record.activity.map((entry) => ({ ...entry })),
  };
}

export function readCases(): CaseRecord[] {
  return records.map(cloneCase);
}

export function readCase(id: string): CaseRecord | undefined {
  const record = records.find((item) => item.id === id);
  return record ? cloneCase(record) : undefined;
}

export function patchCase(id: string, patch: CasePatch, actor = 'Samuel Apochi'): CaseRecord {
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) throw new Error(`Unknown case ${id}`);
  const current = records[index];
  const now = new Date().toISOString();
  const updated: CaseRecord = {
    ...current,
    ...patch,
    tags: patch.tags ? [...patch.tags] : current.tags,
    updatedAt: now,
    revision: current.revision + 1,
    activity: [...current.activity],
  };

  if (patch.status && patch.status !== current.status) {
    updated.activity.push({
      id: `${id}-status-${updated.revision}`,
      caseId: id,
      kind: 'status',
      message: `Status changed from ${current.status} to ${patch.status}`,
      actor,
      createdAt: now,
    });
  }
  if ('ownerId' in patch && patch.ownerId !== current.ownerId) {
    updated.activity.push({
      id: `${id}-owner-${updated.revision}`,
      caseId: id,
      kind: 'assigned',
      message: patch.ownerId ? `Owner changed to ${patch.ownerId}` : 'Case unassigned',
      actor,
      createdAt: now,
    });
  }

  records = records.map((record, recordIndex) => (recordIndex === index ? updated : record));
  return cloneCase(updated);
}

export function appendCaseNote(id: string, message: string, actor = 'Samuel Apochi'): CaseRecord {
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) throw new Error(`Unknown case ${id}`);
  const current = records[index];
  const now = new Date().toISOString();
  const updated: CaseRecord = {
    ...current,
    updatedAt: now,
    revision: current.revision + 1,
    activity: [
      ...current.activity,
      {
        id: `${id}-note-${current.revision + 1}`,
        caseId: id,
        kind: 'note',
        message,
        actor,
        createdAt: now,
      },
    ],
  };
  records = records.map((record, recordIndex) => (recordIndex === index ? updated : record));
  return cloneCase(updated);
}

export function resetMockDatabase(nextRecords = makeSeedCases()): void {
  records = nextRecords.map(cloneCase);
}
