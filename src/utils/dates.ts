const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function relativeTime(iso: string, now = Date.now()): string {
  const deltaSeconds = Math.round((new Date(iso).getTime() - now) / 1000);
  const absolute = Math.abs(deltaSeconds);
  if (absolute < 60) return rtf.format(deltaSeconds, 'second');
  if (absolute < 3600) return rtf.format(Math.round(deltaSeconds / 60), 'minute');
  if (absolute < 86_400) return rtf.format(Math.round(deltaSeconds / 3600), 'hour');
  return rtf.format(Math.round(deltaSeconds / 86_400), 'day');
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
}
