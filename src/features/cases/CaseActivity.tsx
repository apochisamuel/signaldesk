import { formatDateTime } from '../../utils/dates';
import type { CaseActivityEntry } from './types';

export function CaseActivity({ entries }: { entries: CaseActivityEntry[] }) {
  return (
    <section className="detail-section" aria-labelledby="activity-heading">
      <h3 id="activity-heading">Activity</h3>
      <ol className="activity-list">
        {[...entries].reverse().map((entry) => (
          <li key={entry.id}>
            <span className={`activity-dot activity-${entry.kind}`} aria-hidden="true" />
            <div><p>{entry.message}</p><span>{entry.actor} · <time dateTime={entry.createdAt}>{formatDateTime(entry.createdAt)}</time></span></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
