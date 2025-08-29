export type CaseStatus = 'open' | 'in_progress' | 'waiting' | 'resolved';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type SortKey = 'updatedAt' | 'createdAt' | 'title' | 'priority';
export type SortDirection = 'asc' | 'desc';

export interface Person {
  id: string;
  name: string;
  initials: string;
}

export interface CaseActivityEntry {
  id: string;
  caseId: string;
  kind: 'created' | 'assigned' | 'status' | 'note' | 'priority';
  message: string;
  actor: string;
  createdAt: string;
}

export interface CaseRecord {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: Priority;
  ownerId: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  revision: number;
  activity: CaseActivityEntry[];
}

export interface CaseFiltersState {
  status: CaseStatus | 'all';
  priority: Priority | 'all';
  ownerId: string | 'all' | 'unassigned';
  tag: string | 'all';
}

export interface CasesQuery {
  query: string;
  filters: CaseFiltersState;
  sortKey: SortKey;
  sortDirection: SortDirection;
  page: number;
  pageSize: number;
}

export interface CasesQueryResult {
  items: CaseRecord[];
  total: number;
  page: number;
  pageSize: number;
  requestId: string;
}

export interface CasePatch {
  title?: string;
  description?: string;
  status?: CaseStatus;
  priority?: Priority;
  ownerId?: string | null;
  tags?: string[];
}
