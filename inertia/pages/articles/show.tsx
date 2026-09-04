import { Form, Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import CsrfField from '~/components/csrf_field'

type Props = {
  article: {
    slug: string
    title: string
    excerpt?: string | null
    content: string
    thumbnail?: string | null
    publishedAt?: string | null
    author?: { fullName?: string; email: string }
    category: { name: string; slug: string }
    createdAt?: string
  }
  rating: { average: number; total: number }
}

function getInitials(name?: string | null, email?: string) {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }
  return email?.[0]?.toUpperCase() || 'A'
}

function formatDate(date?: string | null) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function ArticleShow({ article, rating }: Props) {
  const { props } = usePage<{ user?: { role?: 'user' | 'admin' } }>()
  const authorName = article.author?.fullName || 'Redaksi'
  const initials = getInitials(article.author?.fullName, article.author?.email)

  return (
    <article className="content-page">
      <div className="breadcrumb">
        <Link route="home">Beranda</Link>
        <span className="separator">/</span>
        <Link route="categories.show" routeParams={{ slug: article.category.slug }}>
          {article.category.name}
        </Link>
      </div>

      <button
        type="button"
        className="article-back-link"
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back()
          } else {
            window.location.href = '/'
          }
        }}
      >
        ← Kembali
      </button>

      <h1>{article.title}</h1>

      <div className="article-meta">
        <div className="author">
          <div className="author-avatar">{initials}</div>
          <div>
            <span className="author-name">{authorName}</span>
            <span className="author-role">Penulis</span>
          </div>
        </div>
        <span style={{ marginLeft: 'auto' }}>
          📅 {formatDate(article.publishedAt || article.createdAt)}
        </span>
        <span>⏱️ 5 menit baca</span>
      </div>

      {article.thumbnail && (
        <img className="article-hero-image" src={article.thumbnail} alt={article.title} />
      )}

      {article.excerpt && <p className="lead">{article.excerpt}</p>}

      <div className="article-content">{article.content}</div>

      <div className="rating-summary">
        <strong>Rating artikel</strong>
        <span>
          {rating.average.toFixed(1)} ★ dari {rating.total} rating
        </span>
      </div>

      {props.user && (
        <Form
          route="articles.rating"
          routeParams={{ slug: article.slug }}
          method="post"
          className="article-rating"
        >
          {({ processing }) => (
            <>
              <CsrfField />
              <strong>Beri rating artikel ini</strong>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input type="radio" name="rating" value={value} defaultChecked={value === 5} />
                    <span>{value} ★</span>
                  </label>
                ))}
              </div>
              <button type="submit" disabled={processing}>
                {processing ? 'Menyimpan...' : 'Kirim rating'}
              </button>
            </>
          )}
        </Form>
      )}
    </article>
  )
}
