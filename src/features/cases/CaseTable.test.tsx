import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { caseFactory } from '../../test/factories';
import { renderWithRouter } from '../../test/render';
import { CaseTable } from './CaseTable';

describe('CaseTable', () => {
  const items = [caseFactory({ id: 'SD-A', title: 'Alpha case' }), caseFactory({ id: 'SD-B', title: 'Beta case' })];
  it('renders case identity and owner state', () => {
    renderWithRouter(<CaseTable items={items} loading={false} selectedIds={new Set()} onToggleSelected={() => {}} onToggleVisible={() => {}} onOpen={() => {}} />);
    expect(screen.getByText('Alpha case')).toBeInTheDocument();
    expect(screen.getByLabelText('Select SD-A')).toBeInTheDocument();
  });
  it('opens a row from the keyboard', () => {
    const onOpen = vi.fn();
    renderWithRouter(<CaseTable items={items} loading={false} selectedIds={new Set()} onToggleSelected={() => {}} onToggleVisible={() => {}} onOpen={onOpen} />);
    fireEvent.keyDown(screen.getByText('Alpha case').closest('tr')!, { key: 'Enter' });
    expect(onOpen).toHaveBeenCalledWith('SD-A');
  });
  it('toggles only the checkbox without opening the row', () => {
    const onOpen = vi.fn(); const onToggle = vi.fn();
    renderWithRouter(<CaseTable items={items} loading={false} selectedIds={new Set()} onToggleSelected={onToggle} onToggleVisible={() => {}} onOpen={onOpen} />);
    fireEvent.click(screen.getByLabelText('Select SD-A'));
    expect(onToggle).toHaveBeenCalledWith('SD-A');
    expect(onOpen).not.toHaveBeenCalled();
  });
  it('shows an empty state without rendering table headings', () => {
    renderWithRouter(<CaseTable items={[]} loading={false} selectedIds={new Set()} onToggleSelected={() => {}} onToggleVisible={() => {}} onOpen={() => {}} />);
    expect(screen.getByText('No cases found')).toBeInTheDocument();
  });
});
