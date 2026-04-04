import type { SavedView } from './viewUtils';

export function SavedViewList({ views, activeId, onSelect }: { views: SavedView[]; activeId: string | null; onSelect: (view: SavedView) => void }) {
  return <div className="saved-view-grid">{views.map((view) => <button type="button" key={view.id} className={activeId === view.id ? 'active' : ''} onClick={() => onSelect(view)}><strong>{view.name}</strong><span>{view.filters.priority !== 'all' ? `${view.filters.priority} priority` : view.filters.status !== 'all' ? `${view.filters.status.replace('_', ' ')} cases` : 'Custom queue'}</span></button>)}</div>;
}
