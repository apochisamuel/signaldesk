import type { CaseRecord } from '../features/cases/types';
import { makeSeedCases } from '../services/seedData';

export function caseFactory(overrides: Partial<CaseRecord> = {}): CaseRecord {
  return { ...makeSeedCases(1)[0], ...overrides, tags: overrides.tags ? [...overrides.tags] : makeSeedCases(1)[0].tags };
}
