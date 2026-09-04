import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import app from '@adonisjs/core/services/app'
import Article from '#models/article'
import Category from '#models/category'
import { articleValidator } from '#validators/article'
import { uniqueSlug } from '#services/slug_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminArticlesController {
  async index({ inertia, request }: HttpContext) {
    const articles = await Article.query()
      .preload('category')
      .preload('author')
      .orderBy('createdAt', 'desc')
      .paginate(request.input('page', 1), 10)
    return inertia.render('admin/articles/index', { articles: articles.serialize() })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('admin/articles/form', {
      article: null,
      categories: await Category.query().orderBy('name'),
    })
  }

  async store({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(articleValidator)
    const thumbnail = await this.validateThumbnail(request)
    if (thumbnail.error) {
      session.flash('error', thumbnail.error)
      return response.redirect().back()
    }
    const article = await Article.create({
      ...payload,
      userId: auth.user!.id,
      slug: await uniqueSlug(payload.title, 'articles'),
      publishedAt: payload.status === 'published' ? DateTime.now() : null,
    })
    if (thumbnail.file) {
      await this.storeThumbnail(thumbnail.file, article)
      await article.save()
    }
    session.flash('success', 'Artikel berhasil dibuat.')
    response.redirect().toRoute('admin.articles.index')
  }

  async edit({ params, inertia, response }: HttpContext) {
    const article = await Article.find(params.id)
    if (!article) return response.notFound()
    return inertia.render('admin/articles/form', {
      article: article.serialize(),
      categories: await Category.query().orderBy('name'),
    })
  }

  async update({ params, request, response, session }: HttpContext) {
    const article = await Article.find(params.id)
    if (!article) return response.notFound()
    const payload = await request.validateUsing(articleValidator)
    const thumbnail = await this.validateThumbnail(request)
    if (thumbnail.error) {
      session.flash('error', thumbnail.error)
      return response.redirect().back()
    }
    article.merge({
      ...payload,
      slug: await uniqueSlug(payload.title, 'articles', article.id),
      publishedAt: payload.status === 'published' ? (article.publishedAt ?? DateTime.now()) : null,
    })
    if (thumbnail.file) await this.storeThumbnail(thumbnail.file, article)
    await article.save()
    session.flash('success', 'Artikel berhasil diperbarui.')
    response.redirect().toRoute('admin.articles.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const article = await Article.find(params.id)
    if (!article) return response.notFound()
    await article.delete()
    session.flash('success', 'Artikel berhasil dihapus.')
    response.redirect().toRoute('admin.articles.index')
  }

  async publish({ params, response, session }: HttpContext) {
    return this.changeStatus(params.id, 'published', response, session)
  }

  async unpublish({ params, response, session }: HttpContext) {
    return this.changeStatus(params.id, 'draft', response, session)
  }

  private async changeStatus(
    id: string,
    status: 'draft' | 'published',
    response: HttpContext['response'],
    session: HttpContext['session']
  ) {
    const article = await Article.find(id)
    if (!article) return response.notFound()
    article.status = status
    article.publishedAt = status === 'published' ? DateTime.now() : null
    await article.save()
    session.flash(
      'success',
      status === 'published'
        ? 'Artikel berhasil dipublikasikan.'
        : 'Publikasi artikel berhasil dibatalkan.'
    )
    response.redirect().back()
  }

  private async validateThumbnail(request: HttpContext['request']) {
    const file = request.file('thumbnail', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })
    if (!file) return { file: null, error: null }
    if (file.hasErrors)
      return {
        file: null,
        error: 'Thumbnail harus berupa gambar JPG, PNG, atau WEBP maksimal 5MB.',
      }
    return { file, error: null }
  }

  private async storeThumbnail(
    file: NonNullable<ReturnType<HttpContext['request']['file']>>,
    article: Article
  ) {
    const filename = `${randomUUID()}.${file.extname}`
    await file.move(app.publicPath('uploads'), { name: filename, overwrite: false })
    article.thumbnail = `/uploads/${filename}`
  }
}
