import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('disables previous on the first page', () => {
    render(<Pagination page={1} pageSize={10} total={30} onPageChange={() => {}} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });
  it('requests the next page', () => {
    const onPageChange = vi.fn(); render(<Pagination page={1} pageSize={10} total={30} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText('Next page')); expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
