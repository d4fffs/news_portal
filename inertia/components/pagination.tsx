import { Link } from '@adonisjs/inertia/react'

type PaginationMeta = {
  currentPage: number
  lastPage: number
  firstPageUrl?: string | null
  previousPageUrl?: string | null
  nextPageUrl?: string | null
  lastPageUrl?: string | null
}

export default function Pagination({
  meta,
  scrollTargetId,
}: {
  meta?: PaginationMeta
  scrollTargetId?: string
}) {
  if (!meta || meta.lastPage <= 1) return null

  const pageUrl = (page: number) => {
    const url = new URL(window.location.href)
    url.searchParams.set('page', String(page))
    return `${url.pathname}${url.search}`
  }

  const scrollToTarget = () => {
    if (!scrollTargetId) return

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(scrollTargetId)
        if (!target) return

        const top = target.getBoundingClientRect().top + window.scrollY - 24
        window.scrollTo({ top, behavior: 'auto' })
      })
    })
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      {meta.currentPage > 1 ? (
        <Link href={pageUrl(meta.currentPage - 1)} onSuccess={scrollToTarget}>
          ← Sebelumnya
        </Link>
      ) : (
        <span>← Sebelumnya</span>
      )}
      <strong>
        Halaman {meta.currentPage} dari {meta.lastPage}
      </strong>
      {meta.currentPage < meta.lastPage ? (
        <Link href={pageUrl(meta.currentPage + 1)} onSuccess={scrollToTarget}>
          Berikutnya →
        </Link>
      ) : (
        <span>Berikutnya →</span>
      )}
    </nav>
  )
}
