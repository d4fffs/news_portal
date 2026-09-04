import Article from '#models/article'
import Category from '#models/category'
import { categoryValidator } from '#validators/category'
import { uniqueSlug } from '#services/slug_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminCategoriesController {
  async index({ inertia }: HttpContext) {
    const categories = await Category.query().withCount('articles').orderBy('name')
    return inertia.render('admin/categories/index', { categories })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('admin/categories/form', { category: null })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(categoryValidator)
    const slug = await uniqueSlug(payload.slug || payload.name, 'categories')
    await Category.create({ name: payload.name, slug })
    session.flash('success', 'Kategori berhasil dibuat.')
    response.redirect().toRoute('admin.categories.index')
  }

  async edit({ params, inertia, response }: HttpContext) {
    const category = await Category.find(params.id)
    if (!category) return response.notFound()
    return inertia.render('admin/categories/form', { category: category.serialize() as any })
  }

  async update({ params, request, response, session }: HttpContext) {
    const category = await Category.find(params.id)
    if (!category) return response.notFound()
    const payload = await request.validateUsing(categoryValidator)
    category.merge({
      name: payload.name,
      slug: await uniqueSlug(payload.slug || payload.name, 'categories', category.id),
    })
    await category.save()
    session.flash('success', 'Kategori berhasil diperbarui.')
    response.redirect().toRoute('admin.categories.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const category = await Category.find(params.id)
    if (!category) return response.notFound()
    if (await Article.query().where('categoryId', category.id).first()) {
      session.flash('error', 'Kategori masih digunakan oleh artikel dan tidak dapat dihapus.')
      return response.redirect().back()
    }
    await category.delete()
    session.flash('success', 'Kategori berhasil dihapus.')
    response.redirect().toRoute('admin.categories.index')
  }
}
