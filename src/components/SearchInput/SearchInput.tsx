import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput({ label = 'Search cases', value, onClear, ...props }, ref) {
  const hasValue = typeof value === 'string' && value.length > 0;
  return (
    <label className="search-field">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="search-icon">⌕</span>
      <input ref={ref} type="search" value={value} {...props} />
      {hasValue && onClear ? <button type="button" className="search-clear" onClick={onClear} aria-label="Clear search">×</button> : null}
    </label>
  );
});
