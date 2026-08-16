import { createPortal } from 'react-dom';
import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';

export function Drawer({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;
  const portalRoot = document.getElementById('portal-root') ?? document.body;
  return createPortal(
    <div className="overlay drawer-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="drawer" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className="drawer-header"><h2 id={titleId}>{title}</h2><button ref={closeRef} type="button" className="icon-button" onClick={onClose} aria-label="Close case details">×</button></header>
        <div className="drawer-body">{children}</div>
      </section>
    </div>,
    portalRoot,
  );
}
