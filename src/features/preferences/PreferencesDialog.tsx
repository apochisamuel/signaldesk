import { Dialog } from '../../components/Dialog/Dialog';
import { usePersistedState } from '../../hooks/usePersistedState';
import { DEFAULT_PREFERENCES } from './preferences';

export function PreferencesDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [preferences, setPreferences] = usePersistedState('signaldesk.preferences', DEFAULT_PREFERENCES);
  const set = (key: keyof typeof preferences, checked: boolean) => setPreferences((current) => ({ ...current, [key]: checked }));
  return <Dialog open={open} title="Preferences" description="Adjust how SignalDesk behaves on this device." onClose={onClose}><div className="preferences-list">
    <label><span><strong>Compact rows</strong><small>Fit more cases into the queue.</small></span><input type="checkbox" checked={preferences.compactRows} onChange={(event) => set('compactRows', event.target.checked)} /></label>
    <label><span><strong>Show resolved in inbox</strong><small>Include recently resolved cases in the main queue.</small></span><input type="checkbox" checked={preferences.showResolvedInInbox} onChange={(event) => set('showResolvedInInbox', event.target.checked)} /></label>
    <label><span><strong>Keyboard hints</strong><small>Show available shortcuts beside supported actions.</small></span><input type="checkbox" checked={preferences.keyboardHints} onChange={(event) => set('keyboardHints', event.target.checked)} /></label>
  </div></Dialog>;
}
