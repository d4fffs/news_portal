import { Link } from '@adonisjs/inertia/react'
import ArticleCard from '~/components/article_card'
import Pagination from '~/components/pagination'

type Props = { category: { name: string; slug: string }; articles: { data: any[]; meta: any } }
export default function CategoryShow({ category, articles }: Props) {
  return (
    <div className="listing-page">
      <div className="breadcrumb">
        <Link route="home">Beranda</Link>
        <span className="separator">/</span>
        <span>Kategori</span>
      </div>
      <span className="eyebrow">Kategori</span>
      <h1>{category.name}</h1>
      <p>
        Kumpulan berita terbaru dari kategori <strong>{category.name}</strong>. Total{' '}
        {articles.data.length} artikel tersedia.
      </p>

      {articles.data.length > 0 ? (
        <div className="article-grid">
          {articles.data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#f8fafc',
            borderRadius: 12,
            border: '1px solid var(--line)',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>📰</div>
          <h3 style={{ marginBottom: 8 }}>Belum ada artikel</h3>
          <p style={{ color: 'var(--muted)' }}>
            Kategori ini belum memiliki artikel. Silakan kembali lagi nanti.
          </p>
        </div>
      )}
      <Pagination meta={articles.meta} />
    </div>
  )
}
