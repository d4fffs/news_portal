import { Form, Link } from '@adonisjs/inertia/react'
import { router, usePage } from '@inertiajs/react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import CsrfField from '~/components/csrf_field'

type Category = { name: string; slug: string }

export default function Navbar({
  user,
  categories = [],
  currentSlug,
}: {
  user?: { fullName?: string | null; initials: string; role?: 'user' | 'admin' }
  categories?: Category[]
  currentSlug?: string
}) {
  const { url } = usePage()
  const isHome = url === '/' || url.startsWith('/?')
  const isAuthPage = url === '/login' || url === '/signup'
  const [searchQuery, setSearchQuery] = useState(
    new URLSearchParams(url.split('?')[1] ?? '').get('q') ?? ''
  )
  const [activeCategory, setActiveCategory] = useState<string | null>(currentSlug ?? null)

  useEffect(() => {
    const handleCategoryChange = (event: Event) => {
      const category = (event as CustomEvent<string | null>).detail
      setActiveCategory(category)
    }

    window.addEventListener('news-category-change', handleCategoryChange)
    return () => window.removeEventListener('news-category-change', handleCategoryChange)
  }, [])

  const selectCategory = (slug: string | null) => {
    setActiveCategory(slug)
    window.dispatchEvent(new CustomEvent('news-category-change', { detail: slug }))
  }

  const searchNews = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchQuery.trim()
    window.dispatchEvent(new CustomEvent('news-search-loading', { detail: true }))
    router.get('/', query ? { q: query } : {}, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () =>
        window.dispatchEvent(new CustomEvent('news-search-loading', { detail: false })),
    })
  }

  const clearSearch = () => {
    setSearchQuery('')
    window.dispatchEvent(new CustomEvent('news-search-loading', { detail: true }))
    router.get(
      '/',
      {},
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () =>
          window.dispatchEvent(new CustomEvent('news-search-loading', { detail: false })),
      }
    )
  }

  return (
    <>
      <header className="site-header">
        <div className="header-main">
          <Link route="home" className="brand">
            <span className="brand-mark">K</span>
            <span className="brand-text">
              Berita Kita
              <small>Portal Berita Terkini</small>
            </span>
          </Link>

          {!isAuthPage && (
            <div className="header-actions">
              <form onSubmit={searchNews} className="header-search-form">
                <span className="header-search-icon">⌕</span>
                <input
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Cari berita..."
                  aria-label="Cari berita"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={clearSearch}
                    aria-label="Hapus pencarian"
                  >
                    ×
                  </button>
                )}
                <button type="submit" aria-label="Cari berita">
                  Cari
                </button>
              </form>
              {user?.role === 'admin' ? (
                <>
                  <Link route="admin.index" className="subscribe-btn">
                    Dashboard
                  </Link>
                  <FormLogout />
                </>
              ) : user ? (
                <FormLogout />
              ) : (
                <Link route="session.create" className="subscribe-btn">
                  Masuk
                </Link>
              )}
            </div>
          )}
        </div>

        {!isAuthPage && (
          <nav className="category-nav">
            <div className="category-nav-inner">
              {isHome ? (
                <button
                  type="button"
                  className={`nav-link category-filter ${!activeCategory ? 'active' : ''}`}
                  onClick={() => selectCategory(null)}
                >
                  Beranda
                </button>
              ) : (
                <Link route="home" className={`nav-link ${!currentSlug ? 'active' : ''}`}>
                  Beranda
                </Link>
              )}
              {categories.slice(0, 8).map((category) =>
                isHome ? (
                  <button
                    key={category.slug}
                    type="button"
                    className={`nav-link category-filter ${activeCategory === category.slug ? 'active' : ''}`}
                    onClick={() => selectCategory(category.slug)}
                  >
                    {category.name}
                  </button>
                ) : (
                  <Link
                    key={category.slug}
                    route="categories.show"
                    routeParams={{ slug: category.slug }}
                    className={`nav-link ${currentSlug === category.slug ? 'active' : ''}`}
                  >
                    {category.name}
                  </Link>
                )
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  )
}

function FormLogout() {
  return (
    <Form route="session.destroy" className="inline-form">
      <CsrfField />
      <button type="submit" className="subscribe-btn">
        Keluar
      </button>
    </Form>
  )
}
