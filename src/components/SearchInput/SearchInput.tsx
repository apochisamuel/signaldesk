import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { label = 'Search cases', value, onClear, id, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasValue = typeof value === 'string' && value.length > 0;

  return (
    <div className="search-field">
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <span aria-hidden="true" className="search-icon">⌕</span>
      <input ref={ref} id={inputId} type="search" value={value} {...props} />
      {hasValue && onClear ? (
        <button type="button" className="search-clear" onClick={onClear} aria-label="Clear search">×</button>
      ) : null}
    </div>
  );
});
