import type { CaseActivityEntry, CaseRecord, Person, Priority, CaseStatus } from '../features/cases/types';

export const PEOPLE: Person[] = [
  { id: 'maya', name: 'Maya Chen', initials: 'MC' },
  { id: 'liam', name: 'Liam Okafor', initials: 'LO' },
  { id: 'aisha', name: 'Aisha Bello', initials: 'AB' },
  { id: 'noah', name: 'Noah Williams', initials: 'NW' },
];

const titles = [
  'Payment authorization fails after retry',
  'Account recovery email arrives late',
  'Inventory sync delayed for warehouse',
  'Invoice total differs from order total',
  'Workspace member cannot accept invite',
  'CSV export omits archived records',
  'Shipment status is not updating',
  'Search returns duplicate organizations',
  'Mobile checkout keyboard covers submit',
  'Webhook delivery retries unexpectedly',
  'Customer profile shows stale address',
  'Bulk assignment skips one selected case',
  'Notification badge remains after reading',
  'Saved view opens on previous page',
  'Comment composer loses draft on refresh',
  'Priority filter clears after navigation',
];

const descriptions = [
  'Customer reports the issue consistently and supplied reproducible steps.',
  'Operations noticed the behavior during the morning queue review.',
  'The issue appears intermittent and is easier to reproduce after a refresh.',
  'Support has confirmed the underlying record still exists and is accessible.',
];

const statuses: CaseStatus[] = ['open', 'in_progress', 'waiting', 'resolved'];
const priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];
const tags = ['payments', 'accounts', 'shipping', 'billing', 'workspace', 'exports', 'search', 'mobile'];

function activityFor(caseId: string, createdAt: string, ownerId: string | null): CaseActivityEntry[] {
  const entries: CaseActivityEntry[] = [
    {
      id: `${caseId}-created`,
      caseId,
      kind: 'created',
      message: 'Case created from operations inbox',
      actor: 'SignalDesk',
      createdAt,
    },
  ];
  if (ownerId) {
    entries.push({
      id: `${caseId}-assigned`,
      caseId,
      kind: 'assigned',
      message: `Assigned to ${PEOPLE.find((person) => person.id === ownerId)?.name ?? ownerId}`,
      actor: 'Triage bot',
      createdAt: new Date(new Date(createdAt).getTime() + 8 * 60_000).toISOString(),
    });
  }
  return entries;
}

export function makeSeedCases(count = 72): CaseRecord[] {
  const base = Date.parse('2026-08-15T08:00:00.000Z');
  return Array.from({ length: count }, (_, index) => {
    const id = `SD-${String(1001 + index).padStart(4, '0')}`;
    const createdAt = new Date(base - index * 47 * 60_000).toISOString();
    const updatedAt = new Date(base - index * 17 * 60_000 + (index % 5) * 4 * 60_000).toISOString();
    const ownerId = index % 6 === 0 ? null : PEOPLE[index % PEOPLE.length].id;
    return {
      id,
      title: `${titles[index % titles.length]}${index >= titles.length ? ` #${Math.floor(index / titles.length) + 1}` : ''}`,
      description: descriptions[index % descriptions.length],
      status: statuses[index % statuses.length],
      priority: priorities[(index * 3) % priorities.length],
      ownerId,
      tags: [tags[index % tags.length], tags[(index + 3) % tags.length]].filter((tag, pos, all) => all.indexOf(tag) === pos),
      createdAt,
      updatedAt,
      revision: 1,
      activity: activityFor(id, createdAt, ownerId),
    };
  });
}
