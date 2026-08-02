import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithRouter } from '../../test/render';
import { GlobalSearch } from './GlobalSearch';

describe('GlobalSearch', () => {
  it('focuses the search field when opened', async () => {
    renderWithRouter(<GlobalSearch open onClose={() => {}} onChoose={() => {}} />);
    await waitFor(() => expect(screen.getByLabelText('Search all cases')).toHaveFocus());
  });
  it('shows matching records and chooses with Enter', async () => {
    const onChoose = vi.fn();
    renderWithRouter(<GlobalSearch open onClose={() => {}} onChoose={onChoose} />);
    fireEvent.change(screen.getByLabelText('Search all cases'), { target: { value: 'SD-1001' } });
    await waitFor(() => expect(screen.getByText('SD-1001')).toBeInTheDocument(), { timeout: 1600 });
    fireEvent.keyDown(screen.getByLabelText('Search all cases'), { key: 'Enter' });
    expect(onChoose).toHaveBeenCalledWith(expect.objectContaining({ id: 'SD-1001' }));
  });
  it('closes on Escape', () => {
    const onClose = vi.fn(); renderWithRouter(<GlobalSearch open onClose={onClose} onChoose={() => {}} />);
    fireEvent.keyDown(screen.getByLabelText('Search all cases'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
