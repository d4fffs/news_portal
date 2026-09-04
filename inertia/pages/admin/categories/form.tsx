import { Form, Link } from '@adonisjs/inertia/react'
import CsrfField from '~/components/csrf_field'
type Props = { category: { id: number; name: string; slug: string } | null }
export default function CategoryForm({ category }: Props) {
  const route = category ? 'admin.categories.update' : 'admin.categories.store'
  return (
    <div className="form-container">
      <Link route="admin.categories.index" className="back-link">
        ← Kembali ke daftar kategori
      </Link>
      <h1>{category ? 'Edit Kategori' : 'Kategori Baru'}</h1>

      <Form
        route={route}
        routeParams={category ? { id: category.id } : undefined}
        method={category ? 'patch' : 'post'}
      >
        {({ errors, processing }) => {
          const formErrors = errors as Record<string, string>
          return (
            <>
              <CsrfField />
              <label>
                📝 Nama Kategori
                <input name="name" defaultValue={category?.name} placeholder="Misalnya: Politik" />
                {formErrors.name && <small>{formErrors.name}</small>}
              </label>
              <label>
                🔗 Slug (URL)
                <input
                  name="slug"
                  defaultValue={category?.slug}
                  placeholder="Dibuat otomatis dari nama"
                />
                {formErrors.slug && <small>{formErrors.slug}</small>}
              </label>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="submit"
                  className="button"
                  disabled={processing}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {processing ? 'Menyimpan...' : category ? '💾 Simpan' : '✨ Buat Kategori'}
                </button>
                <Link
                  route="admin.categories.index"
                  className="button button-outline"
                  style={{ marginTop: 0, flex: '0 0 auto' }}
                >
                  Batal
                </Link>
              </div>
            </>
          )
        }}
      </Form>
    </div>
  )
}
