import { Link } from '@adonisjs/inertia/react'

type Category = { name: string; slug: string }

export default function Footer({ categories = [] }: { categories?: Category[] }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link route="home" className="brand">
            <span className="brand-mark">K</span>
            <span className="brand-text" style={{ color: 'white' }}>
              Berita Kita
              <small style={{ color: '#94a3b8' }}>Portal Berita Terkini</small>
            </span>
          </Link>
          <p>
            Sumber terpercaya untuk berita terkini, mendalam, dan berkualitas dari seluruh penjuru
            Indonesia dan dunia.
          </p>
        </div>

        <div className="footer-col">
          <h4>Topik</h4>
          <ul>
            {categories.slice(0, 6).map((category) => (
              <li key={category.slug}>
                <Link route="categories.show" routeParams={{ slug: category.slug }}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Jelajahi</h4>
          <ul>
            <li>
              <Link route="home">Beranda</Link>
            </li>
            <li>
              <a href="#trending">Trending</a>
            </li>
            <li>
              <a href="#terbaru">Terbaru</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Berita Kita. Hak Cipta Dilindungi.</span>
      </div>
    </footer>
  )
}
