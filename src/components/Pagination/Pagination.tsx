interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  return (
    <nav className="pagination" aria-label="Cases pagination">
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page">‹</button>
      <span>Page <strong>{page}</strong> of {pageCount}</span>
      <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">›</button>
    </nav>
  );
}
