import type { CaseRecord } from './types';

export function selectedVisibleCount(items: CaseRecord[], selectedIds: Set<string>): number {
  return items.reduce((count, item) => count + (selectedIds.has(item.id) ? 1 : 0), 0);
}

export function visibleSelectionState(items: CaseRecord[], selectedIds: Set<string>) {
  const count = selectedVisibleCount(items, selectedIds);
  return { all: items.length > 0 && count === items.length, some: count > 0 && count < items.length, count };
}

export function findAdjacentCase(items: CaseRecord[], activeId: string, direction: -1 | 1): CaseRecord | null {
  const index = items.findIndex((item) => item.id === activeId);
  if (index < 0) return null;
  return items[index + direction] ?? null;
}
