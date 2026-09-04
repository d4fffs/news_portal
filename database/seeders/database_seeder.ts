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

    const categoryNames = ['Teknologi', 'Politik', 'Ekonomi', 'Olahraga', 'Lifestyle', 'Anime']
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
        'teknologi',
        'Kecerdasan Buatan untuk Kehidupan Sehari-hari',
        'Teknologi AI semakin dekat dengan berbagai aktivitas masyarakat.',
      ],
      [
        'teknologi',
        'Inovasi Startup Lokal Menjawab Tantangan Kota',
        'Startup Indonesia menghadirkan solusi digital untuk kebutuhan perkotaan.',
      ],
      [
        'teknologi',
        'Keamanan Data Menjadi Prioritas Baru',
        'Kesadaran menjaga keamanan data terus meningkat di tengah transformasi digital.',
      ],
      [
        'teknologi',
        'Jaringan Internet Cepat untuk Daerah Terpencil',
        'Perluasan infrastruktur digital membuka peluang baru bagi daerah.',
      ],
      [
        'politik',
        'Membaca Arah Kebijakan Publik',
        'Kebijakan yang baik lahir dari data, dialog, dan kepentingan masyarakat.',
      ],
      [
        'politik',
        'Partisipasi Anak Muda dalam Demokrasi',
        'Generasi muda semakin aktif menyuarakan gagasan untuk masa depan bangsa.',
      ],
      [
        'politik',
        'Pemerintah Daerah Perkuat Layanan Publik',
        'Pelayanan yang cepat dan transparan menjadi perhatian utama masyarakat.',
      ],
      [
        'politik',
        'Dialog Kebangsaan Bahas Persatuan',
        'Tokoh masyarakat mendorong dialog terbuka untuk menjaga persatuan.',
      ],
      [
        'politik',
        'Keterbukaan Informasi untuk Masyarakat',
        'Akses informasi yang baik membantu masyarakat ikut mengawasi kebijakan.',
      ],
      [
        'ekonomi',
        'Peluang Ekonomi Kreatif Indonesia',
        'Ekonomi kreatif terus membuka ruang baru bagi pelaku usaha lokal.',
      ],
      [
        'ekonomi',
        'UMKM Naik Kelas dengan Strategi Digital',
        'Pelaku UMKM memanfaatkan platform digital untuk memperluas pasar.',
      ],
      [
        'ekonomi',
        'Pasar Lokal Tumbuh Menjelang Akhir Tahun',
        'Aktivitas perdagangan lokal menunjukkan pertumbuhan yang positif.',
      ],
      [
        'ekonomi',
        'Peluang Investasi Hijau Semakin Terbuka',
        'Investasi berkelanjutan menjadi pilihan baru bagi dunia usaha.',
      ],
      [
        'ekonomi',
        'Koperasi Modern Dukung Ekonomi Warga',
        'Koperasi beradaptasi dengan teknologi untuk melayani anggotanya.',
      ],
      [
        'olahraga',
        'Semangat Baru di Lapangan',
        'Kompetisi sehat menyatukan komunitas dan melahirkan prestasi.',
      ],
      [
        'olahraga',
        'Pembinaan Atlet Muda Mulai Menunjukkan Hasil',
        'Program pembinaan berkelanjutan melahirkan atlet muda berbakat.',
      ],
      [
        'olahraga',
        'Komunitas Lari Ramaikan Ruang Publik',
        'Kegiatan olahraga bersama semakin diminati masyarakat perkotaan.',
      ],
      [
        'olahraga',
        'Strategi Tim Hadapi Kompetisi Musim Ini',
        'Pelatih menyiapkan strategi baru untuk menghadapi persaingan yang ketat.',
      ],
      [
        'olahraga',
        'Sportivitas Jadi Kunci Pertandingan',
        'Semangat fair play membuat pertandingan semakin menarik untuk disaksikan.',
      ],
      [
        'lifestyle',
        'Menemukan Ritme Hidup yang Seimbang',
        'Kebiasaan kecil yang konsisten dapat membuat hari terasa lebih bermakna.',
      ],
      [
        'lifestyle',
        'Kebiasaan Pagi untuk Hari yang Lebih Produktif',
        'Rutinitas sederhana dapat membantu mengawali hari dengan lebih teratur.',
      ],
      [
        'lifestyle',
        'Ruang Hijau Bantu Jaga Kesehatan Mental',
        'Menghabiskan waktu di ruang terbuka memberi manfaat bagi tubuh dan pikiran.',
      ],
      [
        'lifestyle',
        'Kuliner Rumahan dengan Bahan Nusantara',
        'Bahan lokal dapat diolah menjadi hidangan sehat dan lezat.',
      ],
      [
        'lifestyle',
        'Tips Mengatur Waktu di Tengah Kesibukan',
        'Pengaturan prioritas membantu menjaga keseimbangan pekerjaan dan kehidupan.',
      ],
      [
        'anime',
        'Denji dan Reze',
        'Kisah Denji dan Reze kembali menarik perhatian para penggemar anime.',
      ],
      [
        'anime',
        'Petualangan Baru Para Pahlawan Anime',
        'Cerita penuh aksi dan persahabatan hadir dalam serial anime terbaru.',
      ],
      [
        'anime',
        'Studio Animasi Hadirkan Dunia Fantasi',
        'Visual memukau dan cerita hangat menjadi daya tarik film animasi terbaru.',
      ],
      [
        'anime',
        'Karakter Favorit Penggemar Kembali',
        'Kembalinya karakter ikonik disambut antusias oleh komunitas anime.',
      ],
      [
        'anime',
        'Rekomendasi Anime untuk Akhir Pekan',
        'Lima judul anime pilihan cocok menemani waktu santai di akhir pekan.',
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
