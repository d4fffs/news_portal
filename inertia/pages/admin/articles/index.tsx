import { Link, Form } from '@adonisjs/inertia/react'
import CsrfField from '~/components/csrf_field'
import Pagination from '~/components/pagination'
type Props = { articles: { data: any[]; meta: any } }
export default function Articles({ articles }: Props) {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Artikel</h1>
        </div>
        <Link route="admin.articles.create" className="button">
          + Artikel Baru
        </Link>
      </div>

      {articles.data.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: 12,
            border: '1px solid var(--line)',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>📰</div>
          <h3 style={{ marginBottom: 8 }}>Belum ada artikel</h3>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
            Mulai menulis cerita pertama Anda untuk pembaca
          </p>
          <Link route="admin.articles.create" className="button">
            + Buat Artikel Pertama
          </Link>
        </div>
      ) : (
        <div className="admin-list">
          {articles.data.map((article) => (
            <div key={article.id}>
              <div>
                {article.thumbnail && (
                  <img className="admin-thumbnail" src={article.thumbnail} alt="" />
                )}
                <strong style={{ display: 'block', marginBottom: 4, fontSize: 15 }}>
                  {article.title}
                </strong>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {article.category?.name ? `📂 ${article.category.name}` : 'Tanpa kategori'} ·{' '}
                  {article.author?.fullName || article.author?.email || 'Tanpa author'} ·{' '}
                  {article.publishedAt
                    ? `Terbit ${new Date(article.publishedAt).toLocaleDateString('id-ID')}`
                    : 'Belum terbit'}{' '}
                  ·{' '}
                  {new Date(article.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
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
                {article.status === 'published' ? (
                  <Form route="admin.articles.unpublish" routeParams={{ id: article.id }}>
                    {({ processing }) => (
                      <>
                        <CsrfField />
                        <button
                          type="submit"
                          className="link-button"
                          disabled={processing}
                          style={{ color: 'var(--accent)' }}
                        >
                          {processing ? 'Membatalkan...' : 'Unpublish'}
                        </button>
                      </>
                    )}
                  </Form>
                ) : (
                  <Form route="admin.articles.publish" routeParams={{ id: article.id }}>
                    {({ processing }) => (
                      <>
                        <CsrfField />
                        <button
                          type="submit"
                          className="link-button"
                          disabled={processing}
                          style={{ color: '#10b981' }}
                        >
                          {processing ? 'Publishing...' : 'Publish'}
                        </button>
                      </>
                    )}
                  </Form>
                )}
                <Form
                  route="admin.articles.destroy"
                  routeParams={{ id: article.id }}
                  method="delete"
                  onSubmit={(event) => !confirm('Hapus artikel ini?') && event.preventDefault()}
                >
                  {({ processing }) => (
                    <>
                      <CsrfField />
                      <button
                        type="submit"
                        className="link-button"
                        disabled={processing}
                        style={{ color: '#ef4444' }}
                      >
                        {processing ? 'Deleting...' : 'Hapus'}
                      </button>
                    </>
                  )}
                </Form>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination meta={articles.meta} />
    </div>
  )
}
