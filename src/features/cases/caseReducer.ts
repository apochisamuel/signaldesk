import type { CaseRecord } from './types';

export interface CaseState {
  items: CaseRecord[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedIds: Set<string>;
  activeCaseId: string | null;
  latestRequestId: string | null;
}

export const initialCaseState: CaseState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  selectedIds: new Set(),
  activeCaseId: null,
  latestRequestId: null,
};

type Action =
  | { type: 'load-start' }
  | { type: 'load-success'; items: CaseRecord[]; total: number; requestId: string }
  | { type: 'load-error'; message: string }
  | { type: 'toggle-selected'; id: string }
  | { type: 'select-visible'; ids: string[] }
  | { type: 'clear-selection' }
  | { type: 'open-case'; id: string }
  | { type: 'close-case' }
  | { type: 'replace-case'; record: CaseRecord };

export function caseReducer(state: CaseState, action: Action): CaseState {
  switch (action.type) {
    case 'load-start': return { ...state, loading: true, error: null };
    case 'load-success': return { ...state, loading: false, error: null, items: action.items, total: action.total, latestRequestId: action.requestId };
    case 'load-error': return { ...state, loading: false, error: action.message };
    case 'toggle-selected': {
      const selectedIds = new Set(state.selectedIds);
      if (selectedIds.has(action.id)) selectedIds.delete(action.id); else selectedIds.add(action.id);
      return { ...state, selectedIds };
    }
    case 'select-visible': {
      const selectedIds = new Set(state.selectedIds);
      const allSelected = action.ids.every((id) => selectedIds.has(id));
      action.ids.forEach((id) => allSelected ? selectedIds.delete(id) : selectedIds.add(id));
      return { ...state, selectedIds };
    }
    case 'clear-selection': return { ...state, selectedIds: new Set() };
    case 'open-case': return { ...state, activeCaseId: action.id };
    case 'close-case': return { ...state, activeCaseId: null };
    case 'replace-case': return { ...state, items: state.items.map((item) => item.id === action.record.id ? action.record : item) };
    default: return state;
  }
}
