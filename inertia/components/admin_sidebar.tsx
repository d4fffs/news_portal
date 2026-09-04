import { Form, Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import CsrfField from '~/components/csrf_field'
export default function AdminSidebar() {
  const { url } = usePage()
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-inner">
        <Link route="home" className="brand">
          <span className="brand-mark">K</span>
          <span className="brand-text" style={{ color: 'var(--ink)' }}>
            Berita Kita
            <small>Admin Panel</small>
          </span>
        </Link>
        <nav>
          <Link className={url === '/admin' ? 'active' : ''} route="admin.index">
            Dashboard
          </Link>
          <Link
            className={url.startsWith('/admin/articles') ? 'active' : ''}
            route="admin.articles.index"
          >
            Artikel
          </Link>
          <Link
            className={url.startsWith('/admin/categories') ? 'active' : ''}
            route="admin.categories.index"
          >
            Kategori
          </Link>
        </nav>
        <Form route="session.destroy" method="post" className="inline-form admin-logout">
          <CsrfField />
          <button type="submit" className="subscribe-btn">
            Keluar
          </button>
        </Form>
      </div>
    </aside>
  )
}
