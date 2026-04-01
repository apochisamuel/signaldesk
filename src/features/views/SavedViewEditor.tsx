import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import type { CaseFiltersState } from '../cases/types';

export function SavedViewEditor({ currentFilters, onSave }: { currentFilters: CaseFiltersState; onSave: (name: string) => void }) {
  const [name, setName] = useState('');
  const activeCount = Object.values(currentFilters).filter((value) => value !== 'all').length;
  return <div className="saved-view-editor"><label><span>View name</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Shipping escalations" /></label><p>{activeCount} active {activeCount === 1 ? 'filter' : 'filters'} will be saved.</p><Button size="sm" variant="primary" disabled={!name.trim()} onClick={() => { onSave(name.trim()); setName(''); }}>Save view</Button></div>;
}
