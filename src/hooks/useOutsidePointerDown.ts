import { useEffect } from 'react';
import type { RefObject } from 'react';

export function useOutsidePointerDown(ref: RefObject<HTMLElement>, onOutside: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handle = (event: PointerEvent) => {
      const node = ref.current;
      if (node && event.target instanceof Node && !node.contains(event.target)) onOutside();
    };
    document.addEventListener('pointerdown', handle);
    return () => document.removeEventListener('pointerdown', handle);
  }, [ref, onOutside, enabled]);
}
