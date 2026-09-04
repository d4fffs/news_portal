import { Form, Link } from '@adonisjs/inertia/react'
import { useState } from 'react'
import CsrfField from '~/components/csrf_field'
type Props = { article: any; categories: any[]; page?: number }
export default function ArticleForm({ article, categories, page = 1 }: Props) {
  const route = article ? 'admin.articles.update' : 'admin.articles.store'
  const [preview, setPreview] = useState<string | null>(article?.thumbnail ?? null)
  const [fileName, setFileName] = useState<string | null>(null)
  return (
    <div className="form-container" style={{ maxWidth: 720 }}>
      <Link route="admin.articles.index" className="back-link">
        ← Kembali ke daftar artikel
      </Link>
      <h1>{article ? 'Edit Artikel' : 'Artikel Baru'}</h1>
      <p style={{ color: 'var(--muted)', fontSize: 14 }}>
        {article ? 'Perbarui konten artikel Anda' : 'Tulis cerita menarik untuk pembaca setia Anda'}
      </p>

      <Form
        route={route}
        routeParams={article ? { id: article.id } : undefined}
        method={article ? 'patch' : 'post'}
        encType="multipart/form-data"
      >
        {({ errors, processing }) => {
          const formErrors = errors as Record<string, string>
          return (
            <>
              <CsrfField />
              {article && <input type="hidden" name="page" value={page} />}
              <label>
                📝 Judul Artikel
                <input
                  name="title"
                  defaultValue={article?.title}
                  placeholder="Masukkan judul yang menarik..."
                />
                {formErrors.title && <small>{formErrors.title}</small>}
              </label>
              <label>
                📂 Kategori
                <select name="categoryId" defaultValue={article?.categoryId}>
                  <option value="">Pilih kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                ✨ Ringkasan (Excerpt)
                <textarea
                  name="excerpt"
                  defaultValue={article?.excerpt ?? ''}
                  placeholder="Ringkasan singkat yang akan ditampilkan di daftar artikel..."
                  rows={3}
                />
              </label>
              <label>
                📄 Konten
                <textarea
                  name="content"
                  rows={12}
                  defaultValue={article?.content}
                  placeholder="Tulis isi artikel Anda di sini..."
                />
              </label>
              <label className="upload-field">
                🖼️ Gambar Sampul
                <span className="upload-dropzone">
                  <span className="upload-icon">↥</span>
                  <span className="upload-copy">
                    <strong>
                      {fileName ?? (preview ? 'Ganti gambar sampul' : 'Pilih gambar sampul')}
                    </strong>
                    <small>JPG, PNG, WEBP, JPEG · maksimal 5 MB</small>
                  </span>
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (file) {
                        setFileName(file.name)
                        setPreview(URL.createObjectURL(file))
                      }
                    }}
                  />
                </span>
                {preview && (
                  <img
                    className="upload-preview"
                    src={preview}
                    alt="Thumbnail preview"
                    style={{ borderRadius: 8 }}
                  />
                )}
              </label>
              <label>
                📊 Status
                <select name="status" defaultValue={article?.status ?? 'draft'}>
                  <option value="draft">📝 Draft (Belum dipublikasi)</option>
                  <option value="published">✅ Published (Publik)</option>
                </select>
              </label>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  type="submit"
                  className="button"
                  disabled={processing}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {processing
                    ? 'Menyimpan...'
                    : article
                      ? '💾 Simpan Perubahan'
                      : '🚀 Simpan Artikel'}
                </button>
                <Link
                  route="admin.articles.index"
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
