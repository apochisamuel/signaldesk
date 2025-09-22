import type { CasePatch, CaseRecord, CasesQuery, CasesQueryResult } from '../features/cases/types';
import { filterCases } from '../utils/caseFiltering';
import { sortCases } from '../utils/caseSorting';
import { appendCaseNote, patchCase, readCase, readCases } from './mockDatabase';
import { consumeFailure, networkDelay, nextRequestId } from './mockNetwork';

export async function requestCases(query: CasesQuery): Promise<CasesQueryResult> {
  const requestId = nextRequestId('cases');
  await networkDelay(`${query.query}:${query.page}:${query.filters.status}:${query.filters.ownerId}`);
  consumeFailure('requestCases');
  const filtered = filterCases(readCases(), query.query, query.filters);
  const sorted = sortCases(filtered, query.sortKey, query.sortDirection);
  const start = (query.page - 1) * query.pageSize;
  return {
    items: sorted.slice(start, start + query.pageSize),
    total: sorted.length,
    page: query.page,
    pageSize: query.pageSize,
    requestId,
  };
}

export async function requestCase(id: string): Promise<CaseRecord> {
  await networkDelay(id);
  consumeFailure(`requestCase:${id}`);
  const record = readCase(id);
  if (!record) throw new Error('Case not found');
  return record;
}

export async function updateCase(id: string, patch: CasePatch): Promise<CaseRecord> {
  await networkDelay(`${id}:${JSON.stringify(patch)}`);
  consumeFailure(`updateCase:${id}`);
  return patchCase(id, patch);
}

export async function addCaseNote(id: string, message: string): Promise<CaseRecord> {
  await networkDelay(`${id}:note`);
  consumeFailure(`addCaseNote:${id}`);
  return appendCaseNote(id, message);
}

export async function searchCases(query: string, limit = 8): Promise<CaseRecord[]> {
  await networkDelay(`global:${query}`);
  consumeFailure('searchCases');
  if (!query.trim()) return [];
  const normalized = query.toLocaleLowerCase();
  return readCases()
    .filter((record) => `${record.id} ${record.title} ${record.description}`.toLocaleLowerCase().includes(normalized))
    .slice(0, limit);
}
