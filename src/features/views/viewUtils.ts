import type { CaseFiltersState, SortDirection, SortKey } from '../cases/types';

export interface SavedView {
  id: string;
  name: string;
  filters: CaseFiltersState;
  sortKey: SortKey;
  sortDirection: SortDirection;
}

export const DEFAULT_VIEWS: SavedView[] = [
  { id: 'urgent-unassigned', name: 'Urgent + Unassigned', filters: { status: 'all', priority: 'urgent', ownerId: 'unassigned', tag: 'all' }, sortKey: 'updatedAt', sortDirection: 'desc' },
  { id: 'my-open', name: 'My Open Cases', filters: { status: 'open', priority: 'all', ownerId: 'maya', tag: 'all' }, sortKey: 'priority', sortDirection: 'desc' },
  { id: 'waiting', name: 'Waiting on Customer', filters: { status: 'waiting', priority: 'all', ownerId: 'all', tag: 'all' }, sortKey: 'updatedAt', sortDirection: 'desc' },
];

export function findSavedView(id: string | null): SavedView | null {
  return id ? DEFAULT_VIEWS.find((view) => view.id === id) ?? null : null;
}
