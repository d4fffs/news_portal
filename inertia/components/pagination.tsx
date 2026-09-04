import { Link } from '@adonisjs/inertia/react'

type PaginationMeta = {
  currentPage: number
  lastPage: number
  firstPageUrl?: string | null
  previousPageUrl?: string | null
  nextPageUrl?: string | null
  lastPageUrl?: string | null
}

export default function Pagination({ meta }: { meta?: PaginationMeta }) {
  if (!meta || meta.lastPage <= 1) return null

  return (
    <nav className="pagination" aria-label="Pagination">
      {meta.previousPageUrl ? (
        <Link href={meta.previousPageUrl}>← Sebelumnya</Link>
      ) : (
        <span>← Sebelumnya</span>
      )}
      <strong>
        Halaman {meta.currentPage} dari {meta.lastPage}
      </strong>
      {meta.nextPageUrl ? (
        <Link href={meta.nextPageUrl}>Berikutnya →</Link>
      ) : (
        <span>Berikutnya →</span>
      )}
    </nav>
  )
}
