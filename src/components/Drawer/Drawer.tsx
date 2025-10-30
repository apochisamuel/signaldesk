import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export function Drawer({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  const portalRoot = document.getElementById('portal-root') ?? document.body;
  return createPortal(
    <div className="overlay drawer-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <header className="drawer-header"><h2 id="drawer-title">{title}</h2><button type="button" className="icon-button" onClick={onClose} aria-label="Close case details">×</button></header>
        <div className="drawer-body">{children}</div>
      </section>
    </div>,
    portalRoot,
  );
}
