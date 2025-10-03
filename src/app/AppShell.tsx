import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface AppShellProps {
  children: ReactNode;
  onOpenSearch: () => void;
  onOpenPreferences: () => void;
}

const navItems = [
  { to: '/', label: 'Inbox', badge: '18' },
  { to: '/assigned', label: 'Assigned', badge: '7' },
  { to: '/watching', label: 'Watching' },
  { to: '/resolved', label: 'Resolved' },
];

export function AppShell({ children, onOpenSearch, onOpenPreferences }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="SignalDesk home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>SignalDesk</span>
        </div>
        <button className="command-trigger" type="button" onClick={onOpenSearch} aria-label="Search cases">
          <span>Search cases…</span><kbd>⌘ K</kbd>
        </button>
        <button className="profile-button" type="button" onClick={onOpenPreferences} aria-label="Open preferences">
          <span className="avatar" aria-hidden="true">SA</span>
          <span className="profile-name">Samuel Apochi</span>
        </button>
      </header>
      <div className="workspace">
        <aside className="sidebar" aria-label="Workspace navigation">
          <nav className="nav-list">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span>{item.label}</span>
                {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-section">
            <p className="sidebar-label">Saved views</p>
            <NavLink to="/?view=urgent-unassigned" className="nav-link">Urgent + Unassigned</NavLink>
            <NavLink to="/?view=my-open" className="nav-link">My Open Cases</NavLink>
            <NavLink to="/?view=waiting" className="nav-link">Waiting on Customer</NavLink>
          </div>
        </aside>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
