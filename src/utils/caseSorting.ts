import type { CaseRecord, Priority, SortDirection, SortKey } from '../features/cases/types';

const priorityRank: Record<Priority, number> = { low: 0, medium: 1, high: 2, urgent: 3 };

function compareValues(a: CaseRecord, b: CaseRecord, key: SortKey): number {
  if (key === 'priority') return priorityRank[a.priority] - priorityRank[b.priority];
  if (key === 'title') return a.title.localeCompare(b.title);
  return a[key].localeCompare(b[key]);
}

export function sortCases(records: CaseRecord[], key: SortKey, direction: SortDirection): CaseRecord[] {
  const multiplier = direction === 'asc' ? 1 : -1;
  return [...records].sort((a, b) => {
    const primary = compareValues(a, b, key) * multiplier;
    return primary || a.id.localeCompare(b.id);
  });
}
