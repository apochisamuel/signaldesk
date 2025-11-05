export interface ToastMessage { id: string; tone: 'success' | 'error' | 'info'; message: string; }

export function ToastRegion({ messages, onDismiss }: { messages: ToastMessage[]; onDismiss: (id: string) => void }) {
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="false">
      {messages.map((toast) => <div className={`toast toast-${toast.tone}`} key={toast.id}><span>{toast.message}</span><button type="button" onClick={() => onDismiss(toast.id)} aria-label="Dismiss notification">×</button></div>)}
    </div>
  );
}
