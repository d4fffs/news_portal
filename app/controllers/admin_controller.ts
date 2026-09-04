import Article from '#models/article'
import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async index({ inertia }: HttpContext) {
    const [total, published, draft, categories, recent] = await Promise.all([
      Article.query().count('* as total').first(),
      Article.query().where('status', 'published').count('* as total').first(),
      Article.query().where('status', 'draft').count('* as total').first(),
      Category.query().count('* as total').first(),
      Article.query().preload('category').preload('author').orderBy('createdAt', 'desc').limit(5),
    ])

    return inertia.render('admin/index', {
      stats: {
        total: Number(total?.$extras.total ?? 0),
        published: Number(published?.$extras.total ?? 0),
        draft: Number(draft?.$extras.total ?? 0),
        categories: Number(categories?.$extras.total ?? 0),
      },
      recent,
    })
  }
}
