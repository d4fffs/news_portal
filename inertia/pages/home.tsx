import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import ArticleCard from '~/components/article_card'
import { HomeSkeleton } from '~/components/loading_skeleton'
import Pagination from '~/components/pagination'
import { useEffect, useState } from 'react'

type Article = {
  id: number
  slug: string
  title: string
  excerpt?: string | null
  thumbnail?: string | null
  category?: { name: string; slug: string } | null
  createdAt?: string
  averageRating?: number | string | null
}

type Props = {
  featured: any
  latest: { data: Article[] }
  recent: Article[]
  articles: { data: Article[]; meta: any }
  categories: any[]
  trending?: Article[]
  query?: string
}

export default function Home({
  latest,
  recent,
  articles,
  query = '',
  trending: trendingArticles = [],
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const removeStartListener = router.on('start', () => setIsLoading(true))
    const removeFinishListener = router.on('finish', () => setIsLoading(false))
    const refreshAfterHistoryBack = () => {
      if (sessionStorage.getItem('refresh-home-after-back') !== '1') return
      sessionStorage.removeItem('refresh-home-after-back')
      router.reload()
    }

    window.addEventListener('pageshow', refreshAfterHistoryBack)

    return () => {
      removeStartListener()
      removeFinishListener()
      window.removeEventListener('pageshow', refreshAfterHistoryBack)
    }
  }, [])

  useEffect(() => {
    const handleCategoryChange = (event: Event) => {
      const category = (event as CustomEvent<string | null>).detail
      setSelectedCategory(category)
    }

    window.addEventListener('news-category-change', handleCategoryChange)
    return () => window.removeEventListener('news-category-change', handleCategoryChange)
  }, [])

  useEffect(() => {
    const handleSearchLoading = (event: Event) => {
      setIsSearching((event as CustomEvent<boolean>).detail)
    }

    window.addEventListener('news-search-loading', handleSearchLoading)
    return () => window.removeEventListener('news-search-loading', handleSearchLoading)
  }, [])

  const visibleArticles = selectedCategory
    ? latest.data.filter((article) => article.category?.slug === selectedCategory)
    : latest.data
  const visibleRecent = selectedCategory
    ? recent.filter((article) => article.category?.slug === selectedCategory)
    : recent
  const trending = (
    selectedCategory
      ? trendingArticles.filter((article) => article.category?.slug === selectedCategory)
      : trendingArticles
  ).slice(0, 5)
  const recentArticles = visibleRecent
  const olderArticles = selectedCategory
    ? articles.data.filter((article) => article.category?.slug === selectedCategory)
    : articles.data

  if (isLoading) {
    return (
      <div className="portal-page">
        <HomeSkeleton />
      </div>
    )
  }

  return (
    <div className={`portal-page ${isSearching ? 'is-searching' : ''}`}>
      {isSearching && (
        <div className="page-loading" role="status">
          <span className="loading-spinner" />
          Mencari berita...
        </div>
      )}
      {/* Content Layout: Main + Sidebar */}
      <div className={`content-layout ${selectedCategory ? 'category-layout' : ''}`}>
        <div className="content-main">
          {!selectedCategory && (
            <>
              <section className="section-heading">
                <div>
                  <h2>Berita Terbaru</h2>
                </div>
                <span className="view-all">{query ? `Hasil untuk "${query}"` : ''}</span>
              </section>
              {recentArticles.length > 0 ? (
                <div className="article-grid">
                  {recentArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="empty-filter-state">Belum ada berita dalam 1 jam terakhir.</div>
              )}
              <section
                id="article-section"
                className="section-heading article-section-heading"
              >
                <div>
                  <h2>Artikel</h2>
                </div>
              </section>
              {olderArticles.length > 0 ? (
                <div className="article-grid">
                  {olderArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="empty-filter-state">Belum ada artikel lama.</div>
              )}
              <Pagination meta={articles.meta} scrollTargetId="article-section" />
            </>
          )}
          {selectedCategory && (
            <div className="article-grid uniform-news-grid">
              {visibleArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
          {selectedCategory && visibleArticles.length === 0 && (
            <div className="empty-filter-state">Belum ada berita pada kategori ini.</div>
          )}
        </div>

        {/* Sidebar */}
        {!selectedCategory && (
          <aside className="content-sidebar">
            <div className="sidebar-block">
              <h3>Trending</h3>
              <div className="trending-list">
                {trending.map((article, idx) => (
                  <Link
                    key={article.id}
                    route="articles.show"
                    routeParams={{ slug: article.slug }}
                    className="trending-item"
                  >
                    <span className="trending-number">0{idx + 1}</span>
                    <div>
                      {article.category && (
                        <span className="tag" style={{ fontSize: 10, padding: '2px 6px' }}>
                          {article.category.name}
                        </span>
                      )}
                      <h4 style={{ marginTop: 6 }}>{article.title}</h4>
                      <div className="meta">
                        <span>
                          {article.averageRating
                            ? `${Number(article.averageRating).toFixed(1)} ★`
                            : 'Belum ada rating'}
                        </span>
                        <span className="meta-dot" />
                        <span>5 menit baca</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
