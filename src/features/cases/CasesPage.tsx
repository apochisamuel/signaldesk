import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Pagination } from '../../components/Pagination/Pagination';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { requestCases, updateCase } from '../../services/caseApi';
import { pluralize } from '../../utils/text';
import { BulkActions } from './BulkActions';
import { CaseDrawer } from './CaseDrawer';
import { CaseFilters } from './CaseFilters';
import { CaseTable } from './CaseTable';
import { CaseToolbar } from './CaseToolbar';
import { caseReducer, initialCaseState } from './caseReducer';
import type { CaseFiltersState, CasePatch, CaseRecord, CaseStatus, SortDirection, SortKey } from './types';

const defaultFilters: CaseFiltersState = { status: 'all', priority: 'all', ownerId: 'all', tag: 'all' };
const PAGE_SIZE = 12;

interface Props {
  preset?: 'inbox' | 'assigned' | 'watching' | 'resolved';
  onNotify: (tone: 'success' | 'error' | 'info', message: string) => void;
}

export function CasesPage({ preset = 'inbox', onNotify }: Props) {
  const [state, dispatch] = useReducer(caseReducer, initialCaseState);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 220);
  const [filters, setFilters] = useState<CaseFiltersState>(() => preset === 'resolved' ? { ...defaultFilters, status: 'resolved' } : preset === 'assigned' ? { ...defaultFilters, ownerId: 'maya' } : defaultFilters);
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);
  const [refreshToken, setRefreshToken] = useState(0);
  const [bulkBusy, setBulkBusy] = useState(false);

  const load = useCallback(async () => {
    dispatch({ type: 'load-start' });
    try {
      const result = await requestCases({ query: debouncedQuery, filters, sortKey, sortDirection, page, pageSize: PAGE_SIZE });
      dispatch({ type: 'load-success', items: result.items, total: result.total, requestId: result.requestId });
    } catch (error) {
      dispatch({ type: 'load-error', message: error instanceof Error ? error.message : 'Could not load cases' });
    }
  }, [debouncedQuery, filters, sortKey, sortDirection, page]);

  useEffect(() => {
    let active = true;
    dispatch({ type: 'load-start' });
    requestCases({ query: debouncedQuery, filters, sortKey, sortDirection, page, pageSize: PAGE_SIZE })
      .then((result) => { if (active) dispatch({ type: 'load-success', items: result.items, total: result.total, requestId: result.requestId }); })
      .catch((error) => { if (active) dispatch({ type: 'load-error', message: error instanceof Error ? error.message : 'Could not load cases' }); });
    return () => { active = false; };
  }, [debouncedQuery, filters, sortKey, sortDirection, page, refreshToken]);

  const pageCount = Math.max(1, Math.ceil(state.total / PAGE_SIZE));
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const selectedCount = state.selectedIds.size;
  const heading = preset === 'resolved' ? 'Resolved cases' : preset === 'assigned' ? 'Assigned to me' : preset === 'watching' ? 'Watching' : 'Cases';
  const subheading = state.loading && !state.items.length ? 'Loading queue…' : `${pluralize(state.total, 'case')} in this view`;

  const handleFilters = (next: CaseFiltersState) => { setFilters(next); setPage(1); };
  const handleSort = (key: SortKey, direction: SortDirection) => { setSortKey(key); setSortDirection(direction); setPage(1); };
  const handleQuery = (value: string) => { setQuery(value); setPage(1); };

  const updateSelected = async (patch: CasePatch, successMessage: string) => {
    const ids = [...state.selectedIds];
    if (!ids.length) return;
    setBulkBusy(true);
    const results = await Promise.allSettled(ids.map((id) => updateCase(id, patch)));
    const successful: CaseRecord[] = [];
    let failed = 0;
    results.forEach((result) => { if (result.status === 'fulfilled') successful.push(result.value); else failed += 1; });
    successful.forEach((record) => dispatch({ type: 'replace-case', record }));
    setBulkBusy(false);
    if (failed) onNotify('error', `${failed} of ${ids.length} updates failed. Successful changes were kept.`);
    else { onNotify('success', successMessage); dispatch({ type: 'clear-selection' }); }
  };

  const toolbarSummary = useMemo(() => {
    const active = [filters.status !== 'all', filters.priority !== 'all', filters.ownerId !== 'all', filters.tag !== 'all'].filter(Boolean).length;
    return active ? `${active} active ${active === 1 ? 'filter' : 'filters'}` : 'No active filters';
  }, [filters]);

  return (
    <div className="cases-page">
      <header className="page-header">
        <div><div className="eyebrow">Operations queue</div><h1>{heading}</h1><p>{subheading}</p></div>
        <div className="page-actions"><span className="filter-summary">{toolbarSummary}</span><Button size="sm" onClick={() => setRefreshToken((token) => token + 1)} disabled={state.loading}>Refresh</Button></div>
      </header>
      <CaseToolbar query={query} onQueryChange={handleQuery} sortKey={sortKey} sortDirection={sortDirection} onSortChange={handleSort} />
      <CaseFilters filters={filters} onChange={handleFilters} />
      {state.error ? <div className="error-banner" role="alert"><span>{state.error}</span><Button size="sm" onClick={() => void load()}>Try again</Button></div> : null}
      <BulkActions selectedCount={selectedCount} busy={bulkBusy} onAssign={(ownerId) => void updateSelected({ ownerId }, `Assigned ${pluralize(selectedCount, 'case')}.`)} onSetStatus={(status: CaseStatus) => void updateSelected({ status }, `Updated ${pluralize(selectedCount, 'case')}.`)} onClear={() => dispatch({ type: 'clear-selection' })} />
      <CaseTable items={state.items} loading={state.loading} selectedIds={state.selectedIds} onToggleSelected={(id) => dispatch({ type: 'toggle-selected', id })} onToggleVisible={(ids) => dispatch({ type: 'select-visible', ids })} onOpen={(id) => dispatch({ type: 'open-case', id })} />
      <div className="list-footer"><span>{state.items.length ? `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, state.total)} of ${state.total}` : 'No visible cases'}</span><Pagination page={page} pageSize={PAGE_SIZE} total={state.total} onPageChange={setPage} /></div>
      <CaseDrawer caseId={state.activeCaseId} onClose={() => dispatch({ type: 'close-case' })} onUpdated={(record) => dispatch({ type: 'replace-case', record })} onNotify={onNotify} />
    </div>
  );
}
