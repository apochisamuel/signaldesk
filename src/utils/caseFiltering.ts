import type { CaseFiltersState, CaseRecord } from '../features/cases/types';

export function matchesQuery(record: CaseRecord, query: string): boolean {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return true;
  const haystack = [record.id, record.title, record.description, record.tags.join(' ')].join(' ').toLocaleLowerCase();
  return normalized.split(/\s+/).every((term) => haystack.includes(term));
}

export function matchesFilters(record: CaseRecord, filters: CaseFiltersState): boolean {
  if (filters.status !== 'all' && record.status !== filters.status) return false;
  if (filters.priority !== 'all' && record.priority !== filters.priority) return false;
  if (filters.ownerId === 'unassigned' && record.ownerId !== null) return false;
  if (filters.ownerId !== 'all' && filters.ownerId !== 'unassigned' && record.ownerId !== filters.ownerId) return false;
  if (filters.tag !== 'all' && !record.tags.includes(filters.tag)) return false;
  return true;
}

export function filterCases(records: CaseRecord[], query: string, filters: CaseFiltersState): CaseRecord[] {
  return records.filter((record) => matchesQuery(record, query) && matchesFilters(record, filters));
}
