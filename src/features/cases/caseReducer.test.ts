import { describe, expect, it } from 'vitest';
import { caseFactory } from '../../test/factories';
import { caseReducer, initialCaseState } from './caseReducer';

function stateWithSelection(ids: string[]) { return { ...initialCaseState, selectedIds: new Set(ids) }; }

describe('caseReducer', () => {
  it('toggles selection without mutating the existing Set', () => {
    const before = stateWithSelection(['A']);
    const next = caseReducer(before, { type: 'toggle-selected', id: 'B' });
    expect([...next.selectedIds]).toEqual(['A', 'B']);
    expect([...before.selectedIds]).toEqual(['A']);
  });
  it('selects all visible ids when some are not selected', () => {
    const next = caseReducer(stateWithSelection(['hidden']), { type: 'select-visible', ids: ['A', 'B'] });
    expect(next.selectedIds).toEqual(new Set(['hidden', 'A', 'B']));
  });
  it('deselects only visible ids when all visible ids are selected', () => {
    const next = caseReducer(stateWithSelection(['hidden', 'A', 'B']), { type: 'select-visible', ids: ['A', 'B'] });
    expect(next.selectedIds).toEqual(new Set(['hidden']));
  });
  it('replaces an updated record without changing sibling identity', () => {
    const first = caseFactory({ id: 'A' }); const second = caseFactory({ id: 'B' });
    const next = caseReducer({ ...initialCaseState, items: [first, second] }, { type: 'replace-case', record: { ...first, title: 'Updated' } });
    expect(next.items[0].title).toBe('Updated');
    expect(next.items[1]).toBe(second);
  });
});
