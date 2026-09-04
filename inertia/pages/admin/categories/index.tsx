import { Link, Form } from '@adonisjs/inertia/react'
import CsrfField from '~/components/csrf_field'
type Props = { categories: any[] }
export default function Categories({ categories }: Props) {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Kategori</h1>
        </div>
        <Link route="admin.categories.create" className="button">
          + Kategori Baru
        </Link>
      </div>

      {categories.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: 12,
            border: '1px solid var(--line)',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
          <h3 style={{ marginBottom: 8 }}>Belum ada kategori</h3>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
            Buat kategori untuk mengelompokkan artikel Anda
          </p>
          <Link route="admin.categories.create" className="button">
            + Buat Kategori Pertama
          </Link>
        </div>
      ) : (
        <div className="admin-list">
          {categories.map((category) => (
            <div key={category.id}>
              <div>
                <strong style={{ display: 'block', fontSize: 15 }}>{category.name}</strong>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>/{category.slug}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {category.articles_count ?? 0} artikel
                </span>
              </div>
              <span className="admin-actions">
                <Link
                  route="admin.categories.edit"
                  routeParams={{ id: category.id }}
                  style={{ color: 'var(--brand)', fontWeight: 600 }}
                >
                  Edit
                </Link>
                <Form
                  route="admin.categories.destroy"
                  routeParams={{ id: category.id }}
                  method="delete"
                  onSubmit={(event) => !confirm('Hapus kategori ini?') && event.preventDefault()}
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
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
