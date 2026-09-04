export function ArticleSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`skeleton-article-card ${featured ? 'featured' : ''}`} aria-hidden="true">
      <div className="skeleton skeleton-image" />
      <div className="skeleton-article-body">
        <div className="skeleton skeleton-tag" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-copy" />
        <div className="skeleton skeleton-meta" />
      </div>
    </div>
  )
}

export function AdminArticleSkeleton() {
  return (
    <div className="admin-article-skeleton" aria-hidden="true">
      <div className="skeleton skeleton-admin-title" />
      <div className="skeleton skeleton-admin-meta" />
      <div className="skeleton skeleton-admin-actions" />
    </div>
  )
}

export function HomeSkeleton() {
  return (
    <div className="home-skeleton" aria-label="Memuat artikel">
      <div className="home-skeleton-content">
        <div className="skeleton skeleton-heading" />
        <div className="article-grid">
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
        </div>
      </div>
    </div>
  )
}
