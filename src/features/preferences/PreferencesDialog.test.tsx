import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PreferencesDialog } from './PreferencesDialog';

describe('PreferencesDialog', () => {
  it('persists preference changes locally', () => {
    render(<PreferencesDialog open onClose={() => {}} />);
    fireEvent.click(screen.getByLabelText('Compact rows'));
    expect(JSON.parse(window.localStorage.getItem('signaldesk.preferences') ?? '{}').compactRows).toBe(true);
  });
});
