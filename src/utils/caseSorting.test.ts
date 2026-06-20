import { describe, expect, it } from 'vitest';
import { caseFactory } from '../test/factories';
import { sortCases } from './caseSorting';

describe('case sorting', () => {
  it('orders urgent priority ahead of lower priorities in descending mode', () => {
    const low = caseFactory({ id: 'low', priority: 'low' });
    const urgent = caseFactory({ id: 'urgent', priority: 'urgent' });
    expect(sortCases([low, urgent], 'priority', 'desc').map((item) => item.id)).toEqual(['urgent', 'low']);
  });
  it('does not mutate the source array', () => {
    const source = [caseFactory({ id: 'b', title: 'Beta' }), caseFactory({ id: 'a', title: 'Alpha' })];
    sortCases(source, 'title', 'asc');
    expect(source.map((item) => item.id)).toEqual(['b', 'a']);
  });
  it('uses stable ids to break equal sort values', () => {
    const one = caseFactory({ id: 'SD-2', title: 'Same' });
    const two = caseFactory({ id: 'SD-1', title: 'Same' });
    expect(sortCases([one, two], 'title', 'asc').map((item) => item.id)).toEqual(['SD-1', 'SD-2']);
  });
});
