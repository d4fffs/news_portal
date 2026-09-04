import { Link } from '@adonisjs/inertia/react'
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
          <a
            href="/logout"
            onClick={(event) => {
              event.preventDefault()
              document.querySelector<HTMLFormElement>('#admin-logout')?.submit()
            }}
          >
            Logout
          </a>
        </nav>
        <form id="admin-logout" action="/logout" method="post" hidden>
          <CsrfField />
        </form>
      </div>
    </aside>
  )
}
