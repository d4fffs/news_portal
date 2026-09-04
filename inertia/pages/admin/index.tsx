import { Link } from '@adonisjs/inertia/react'

type Props = {
  stats: { total: number; published: number; draft: number; categories: number }
  recent: any[]
}


export default function Admin({ stats, recent }: Props) {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
        </div>
        <Link route="admin.articles.create" className="button">
          + Artikel Baru
        </Link>
      </div>

      <div className="stats-grid">
        {[
          ['Total articles', stats.total],
          ['Published', stats.published],
          ['Drafts', stats.draft],
          ['Categories', stats.categories],
        ].map(([label, value]) => (
          <div className="stat" key={label as string}>
            <span>
              {label}
            </span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 22, margin: '32px 0 16px' }}>Artikel Terbaru</h2>
      <div className="admin-list">
        {recent.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--muted)' }}>
            Belum ada artikel.{' '}
            <Link route="admin.articles.create" style={{ color: 'var(--brand)' }}>
              Buat artikel pertama
            </Link>
          </div>
        ) : (
          recent.map((article) => (
            <div key={article.id}>
              <div>
                <strong style={{ display: 'block', marginBottom: 4 }}>{article.title}</strong>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {article.category?.name || 'Tanpa kategori'} ·{' '}
                  {new Date(article.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div className="admin-actions">
                <span className="status">{article.status}</span>
                <Link
                  route="admin.articles.edit"
                  routeParams={{ id: article.id }}
                  style={{ color: 'var(--brand)', fontWeight: 600 }}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
