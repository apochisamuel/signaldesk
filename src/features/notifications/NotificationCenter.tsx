import { useCallback, useReducer, useRef } from 'react';
import { ToastRegion } from '../../components/Toast/Toast';
import { notificationReducer } from './notificationReducer';

export function useNotifications() {
  const [messages, dispatch] = useReducer(notificationReducer, []);
  const nextId = useRef(1);
  const notify = useCallback((tone: 'success' | 'error' | 'info', message: string) => {
    const id = `toast-${nextId.current++}`;
    dispatch({ type: 'push', toast: { id, tone, message } });
    window.setTimeout(() => dispatch({ type: 'dismiss', id }), 4500);
  }, []);
  const region = <ToastRegion messages={messages} onDismiss={(id) => dispatch({ type: 'dismiss', id })} />;
  return { notify, region };
}
