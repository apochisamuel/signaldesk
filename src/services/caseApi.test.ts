import { describe, expect, it } from 'vitest';
import { addCaseNote, requestCase, requestCases, searchCases, updateCase } from './caseApi';
import { configureMockNetwork } from './mockNetwork';

const filters = { status: 'all', priority: 'all', ownerId: 'all', tag: 'all' } as const;

describe('caseApi', () => {
  it('paginates deterministic records', async () => {
    const result = await requestCases({ query: '', filters, sortKey: 'createdAt', sortDirection: 'desc', page: 2, pageSize: 10 });
    expect(result.items).toHaveLength(10);
    expect(result.total).toBe(72);
    expect(result.page).toBe(2);
  });
  it('filters before pagination', async () => {
    const result = await requestCases({ query: 'payment', filters, sortKey: 'updatedAt', sortDirection: 'desc', page: 1, pageSize: 50 });
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((item) => item.title.toLowerCase().includes('payment') || item.description.toLowerCase().includes('payment') || item.tags.includes('payments'))).toBe(true);
  });
  it('increments revision when updating a case', async () => {
    const before = await requestCase('SD-1001');
    const updated = await updateCase(before.id, { priority: 'urgent' });
    expect(updated.priority).toBe('urgent');
    expect(updated.revision).toBe(before.revision + 1);
  });
  it('adds notes to activity history', async () => {
    const updated = await addCaseNote('SD-1001', 'Customer confirmed the retry works.');
    expect(updated.activity.at(-1)?.message).toContain('Customer confirmed');
  });
  it('can inject a deterministic mutation failure', async () => {
    configureMockNetwork({ fail: [{ key: 'updateCase:SD-1001', remaining: 1, message: 'planned failure' }] });
    await expect(updateCase('SD-1001', { status: 'resolved' })).rejects.toThrow('planned failure');
  });
  it('searches across ids and titles', async () => {
    const results = await searchCases('SD-1001');
    expect(results[0]?.id).toBe('SD-1001');
  });
});
