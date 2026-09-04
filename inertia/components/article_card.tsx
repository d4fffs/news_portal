import { Link } from '@adonisjs/inertia/react'
import { DateTime } from 'luxon'

type Category = { name: string; slug: string }
type Article = {
  slug: string
  title: string
  excerpt?: string | null
  thumbnail?: string | null
  category?: Category | null
  createdAt?: string
}

function formatTime(date: string) {
  const dt = DateTime.fromISO(date).setLocale('id')
  const diff = DateTime.now().diff(dt, 'days').days
  if (diff < 1) {
    return dt.toRelative({ locale: 'id' }) || 'Baru saja'
  }
  return dt.toFormat('d MMM yyyy')
}

export default function ArticleCard({
  article,
  featured = false,
  horizontal = false,
  compact = false,
}: {
  article: Article
  featured?: boolean
  horizontal?: boolean
  compact?: boolean
}) {
  const timeLabel = article.createdAt ? formatTime(article.createdAt) : null
  const cardClass = [
    'article-card',
    featured && 'featured',
    horizontal && 'horizontal',
    compact && 'compact',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClass}>
      <Link route="articles.show" routeParams={{ slug: article.slug }} className="card-image">
        {article.thumbnail ? (
          <img src={article.thumbnail} alt={article.title} loading="lazy" />
        ) : (
          <div className="image-placeholder">Berita</div>
        )}
      </Link>
      <div className="article-card-body">
        {article.category && !compact && (
          <Link
            route="categories.show"
            routeParams={{ slug: article.category.slug }}
            className="tag"
          >
            {article.category.name}
          </Link>
        )}
        <h3>
          <Link route="articles.show" routeParams={{ slug: article.slug }}>
            {article.title}
          </Link>
        </h3>
        {!compact && article.excerpt && <p className="excerpt">{article.excerpt}</p>}
        {timeLabel && (
          <div className="meta">
            <span className="meta-author">Redaksi</span>
            <span className="meta-dot" />
            <span>{timeLabel}</span>
            <span className="meta-dot" />
            <span>5 mnt baca</span>
          </div>
        )}
      </div>
    </article>
  )
}
