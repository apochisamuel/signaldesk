import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export function Dialog({ open, title, description, onClose, children }: { open: boolean; title: string; description?: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  const portalRoot = document.getElementById('portal-root') ?? document.body;
  return createPortal(
    <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby={description ? 'dialog-description' : undefined}>
        <header className="dialog-header"><div><h2 id="dialog-title">{title}</h2>{description ? <p id="dialog-description">{description}</p> : null}</div><button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog">×</button></header>
        {children}
      </section>
    </div>, portalRoot,
  );
}
