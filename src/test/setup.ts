import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { resetMockDatabase } from '../services/mockDatabase';
import { resetMockNetwork } from '../services/mockNetwork';

afterEach(() => {
  cleanup();
  resetMockDatabase();
  resetMockNetwork();
  window.localStorage.clear();
});
