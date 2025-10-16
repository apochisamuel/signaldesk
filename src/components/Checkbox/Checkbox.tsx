import { forwardRef, useEffect, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ indeterminate = false, ...props }, forwardedRef) {
  const localRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      {...props}
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      type="checkbox"
      className="checkbox"
    />
  );
});
