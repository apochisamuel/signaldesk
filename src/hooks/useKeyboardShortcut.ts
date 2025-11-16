import { useEventListener } from './useEventListener';

interface ShortcutOptions { meta?: boolean; ctrl?: boolean; alt?: boolean; shift?: boolean; enabled?: boolean; }

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

export function useKeyboardShortcut(key: string, callback: () => void, options: ShortcutOptions = {}) {
  const { meta, ctrl, alt, shift, enabled = true } = options;
  useEventListener('keydown', (event) => {
    if (!enabled || isEditableTarget(event.target)) return;
    if (event.key.toLowerCase() !== key.toLowerCase()) return;
    if (meta !== undefined && event.metaKey !== meta) return;
    if (ctrl !== undefined && event.ctrlKey !== ctrl) return;
    if (alt !== undefined && event.altKey !== alt) return;
    if (shift !== undefined && event.shiftKey !== shift) return;
    event.preventDefault();
    callback();
  });
}
