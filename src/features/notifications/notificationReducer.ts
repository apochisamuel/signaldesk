import type { ToastMessage } from '../../components/Toast/Toast';

export type NotificationState = ToastMessage[];
export type NotificationAction = { type: 'push'; toast: ToastMessage } | { type: 'dismiss'; id: string } | { type: 'clear' };

export function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  if (action.type === 'push') return [...state.slice(-3), action.toast];
  if (action.type === 'dismiss') return state.filter((toast) => toast.id !== action.id);
  return [];
}
