import { Navigate, Route, Routes } from 'react-router-dom';
import { CasesPage } from '../features/cases/CasesPage';

export function AppRoutes({ onNotify }: { onNotify: (tone: 'success' | 'error' | 'info', message: string) => void }) {
  return (
    <Routes>
      <Route path="/" element={<CasesPage preset="inbox" onNotify={onNotify} />} />
      <Route path="/assigned" element={<CasesPage preset="assigned" onNotify={onNotify} />} />
      <Route path="/watching" element={<CasesPage preset="watching" onNotify={onNotify} />} />
      <Route path="/resolved" element={<CasesPage preset="resolved" onNotify={onNotify} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
