import { describe, expect, it } from 'vitest';
import { caseFactory } from '../test/factories';
import { filterCases, matchesFilters, matchesQuery } from './caseFiltering';

const defaults = { status: 'all', priority: 'all', ownerId: 'all', tag: 'all' } as const;

describe('case filtering', () => {
  it('matches normalized terms across title and tags', () => {
    const record = caseFactory({ title: 'Payment retry failed', tags: ['checkout', 'billing'] });
    expect(matchesQuery(record, 'PAYMENT billing')).toBe(true);
    expect(matchesQuery(record, 'shipping')).toBe(false);
  });
  it('supports unassigned as a distinct owner filter', () => {
    expect(matchesFilters(caseFactory({ ownerId: null }), { ...defaults, ownerId: 'unassigned' })).toBe(true);
    expect(matchesFilters(caseFactory({ ownerId: 'maya' }), { ...defaults, ownerId: 'unassigned' })).toBe(false);
  });
  it('requires every active filter to match', () => {
    const record = caseFactory({ status: 'open', priority: 'urgent', ownerId: 'maya', tags: ['payments'] });
    expect(filterCases([record], '', { status: 'open', priority: 'urgent', ownerId: 'maya', tag: 'payments' })).toEqual([record]);
    expect(filterCases([record], '', { status: 'waiting', priority: 'urgent', ownerId: 'maya', tag: 'payments' })).toEqual([]);
  });
});
