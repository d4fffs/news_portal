import { DateTime } from 'luxon'
import Category from '#models/category'
import User from '#models/user'
import Article from '#models/article'

export default class DatabaseSeeder {
  async run() {
    const admin = await User.updateOrCreate(
      { email: 'admin@example.com' },
      { fullName: 'Portal Admin', password: 'password', role: 'admin' }
    )
    await User.query().whereRaw('email LIKE ?', ['%@example.com']).update({ role: 'admin' })

    const categoryNames = ['Teknologi', 'Politik', 'Ekonomi', 'Olahraga', 'Lifestyle']
    const categories = new Map<string, Category>()
    for (const name of categoryNames) {
      const slug = name.toLowerCase()
      categories.set(slug, await Category.updateOrCreate({ slug }, { name, slug }))
    }

    const samples = [
      [
        'teknologi',
        'Masa Depan Teknologi Digital',
        'Perubahan digital terus membentuk cara kita bekerja dan belajar.',
      ],
      [
        'politik',
        'Membaca Arah Kebijakan Publik',
        'Kebijakan yang baik lahir dari data, dialog, dan kepentingan masyarakat.',
      ],
      [
        'ekonomi',
        'Peluang Ekonomi Kreatif Indonesia',
        'Ekonomi kreatif terus membuka ruang baru bagi pelaku usaha lokal.',
      ],
      [
        'olahraga',
        'Semangat Baru di Lapangan',
        'Kompetisi sehat menyatukan komunitas dan melahirkan prestasi.',
      ],
      [
        'lifestyle',
        'Menemukan Ritme Hidup yang Seimbang',
        'Kebiasaan kecil yang konsisten dapat membuat hari terasa lebih bermakna.',
      ],
    ] as const

    for (const [categorySlug, title, excerpt] of samples) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      await Article.updateOrCreate(
        { slug },
        {
          userId: admin.id,
          categoryId: categories.get(categorySlug)!.id,
          title,
          slug,
          excerpt,
          content: `${excerpt} Portal Berita Kita menyajikan konteks dan informasi yang relevan untuk pembaca setiap hari.`,
          status: 'published',
          publishedAt: DateTime.now(),
        }
      )
    }
  }
}
