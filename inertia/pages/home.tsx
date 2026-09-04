import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import ArticleCard from '~/components/article_card'
import { HomeSkeleton } from '~/components/loading_skeleton'
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
  categories: any[]
  trending?: Article[]
  query?: string
}

export default function Home({
  featured,
  latest,
  query = '',
  trending: trendingArticles = [],
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isFiltering, setIsFiltering] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const removeStartListener = router.on('start', () => setIsLoading(true))
    const removeFinishListener = router.on('finish', () => setIsLoading(false))

    return () => {
      removeStartListener()
      removeFinishListener()
    }
  }, [])

  useEffect(() => {
    const handleCategoryChange = (event: Event) => {
      const category = (event as CustomEvent<string | null>).detail
      setIsFiltering(true)
      setSelectedCategory(category)
      window.setTimeout(() => setIsFiltering(false), 180)
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
  const visibleFeatured = selectedCategory
    ? (visibleArticles.find((article) => article.id === featured?.id) ?? visibleArticles[0])
    : featured
  const sideStories = visibleArticles
    .filter((article) => article.id !== visibleFeatured?.id)
    .slice(0, 3)
  const trending = (
    selectedCategory
      ? trendingArticles.filter((article) => article.category?.slug === selectedCategory)
      : trendingArticles
  ).slice(0, 5)
  const sideStoryIds = sideStories.map((article) => article.id)
  const mainArticles = visibleArticles.filter(
    (article) => article.id !== visibleFeatured?.id && !sideStoryIds.includes(article.id)
  )
  const featuredMain = mainArticles[0]
  const restArticles = mainArticles.slice(1)

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
      {/* Hero Section: used only for the unfiltered homepage */}
      {!selectedCategory && (
        <section className={`hero-section ${isFiltering ? 'is-filtering' : ''}`}>
          {visibleFeatured ? (
            <Link
              route="articles.show"
              routeParams={{ slug: visibleFeatured.slug }}
              className="hero-main"
            >
              {visibleFeatured.thumbnail ? (
                <img src={visibleFeatured.thumbnail} alt={visibleFeatured.title} />
              ) : (
                <div className="image-placeholder">Berita Utama</div>
              )}
              <div className="hero-overlay">
                {visibleFeatured.category && (
                  <span className="tag">{visibleFeatured.category.name}</span>
                )}
                <h1>{visibleFeatured.title}</h1>
                <p>{visibleFeatured.excerpt}</p>
                <div className="meta">
                  <span>Oleh Redaksi</span>
                  <span className="meta-dot" />
                  <span>5 menit baca</span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="empty-filter-state">Belum ada berita pada kategori ini.</div>
          )}
          <div className="hero-side">
            {sideStories.map((article) => (
              <ArticleCard key={article.id} article={article} horizontal />
            ))}
          </div>
        </section>
      )}

      {/* Content Layout: Main + Sidebar */}
      <div className={`content-layout ${selectedCategory ? 'category-layout' : ''}`}>
        <div className="content-main">
          {/* Featured Big Article */}
          {!selectedCategory && featuredMain && (
            <>
              <section className="section-heading">
                <div>
                  <h2>Berita Terbaru</h2>
                </div>
                <span className="view-all">{query ? `Hasil untuk "${query}"` : ''}</span>
              </section>
              <div className="article-grid">
                <ArticleCard article={featuredMain} featured />
                {restArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
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
