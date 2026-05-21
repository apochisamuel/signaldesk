import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { AppShell } from './AppShell';
import { AppRoutes } from './routes';
import { GlobalSearch } from '../features/search/GlobalSearch';
import { PreferencesDialog } from '../features/preferences/PreferencesDialog';
import { useNotifications } from '../features/notifications/NotificationCenter';

export function App() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const { notify, region } = useNotifications();

  useKeyboardShortcut('k', () => setSearchOpen(true), { meta: true });
  useKeyboardShortcut('k', () => setSearchOpen(true), { ctrl: true });

  return (
    <>
      <AppShell onOpenSearch={() => setSearchOpen(true)} onOpenPreferences={() => setPreferencesOpen(true)}>
        <AppRoutes onNotify={notify} />
      </AppShell>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} onChoose={(record) => {
        navigate(`/?case=${encodeURIComponent(record.id)}`);
        notify('info', `Opened ${record.id}.`);
      }} />
      <PreferencesDialog open={preferencesOpen} onClose={() => setPreferencesOpen(false)} />
      {region}
    </>
  );
}
