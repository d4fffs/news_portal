import Article from '#models/article'
import ArticleRating from '#models/article_rating'
import Category from '#models/category'
import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'

export default class PublicController {
  async home({ inertia, request }: HttpContext) {
    const query = request.input('q', '').trim()
    const sort = request.input('sort', 'desc') === 'asc' ? 'asc' : 'desc'
    const searchPattern = `%${query}%`
    const oneHourAgo = DateTime.now().minus({ hours: 1 })
    const [featured, latest, recent, articles, categories, trending] = await Promise.all([
      Article.query()
        .where('status', 'published')
        .if(query, (builder) =>
          builder.where((search) =>
            search
              .whereRaw('title LIKE ?', [searchPattern])
              .orWhereRaw('excerpt LIKE ?', [searchPattern])
              .orWhereRaw('content LIKE ?', [searchPattern])
          )
        )
        .preload('category')
        .preload('author')
        .orderBy('publishedAt', 'desc')
        .first(),
      Article.query()
        .where('status', 'published')
        .if(query, (builder) =>
          builder.where((search) =>
            search
              .whereRaw('title LIKE ?', [searchPattern])
              .orWhereRaw('excerpt LIKE ?', [searchPattern])
              .orWhereRaw('content LIKE ?', [searchPattern])
          )
        )
        .preload('category')
        .preload('author')
        .orderBy('publishedAt', 'desc')
        .paginate(1, 100),
      Article.query()
        .where('status', 'published')
        .where('createdAt', '>=', oneHourAgo.toSQL()!)
        .if(query, (builder) =>
          builder.where((search) =>
            search
              .whereRaw('title LIKE ?', [searchPattern])
              .orWhereRaw('excerpt LIKE ?', [searchPattern])
              .orWhereRaw('content LIKE ?', [searchPattern])
          )
        )
        .preload('category')
        .preload('author')
        .orderBy('createdAt', 'desc'),
      Article.query()
        .where('status', 'published')
        .where('createdAt', '<', oneHourAgo.toSQL()!)
        .if(query, (builder) =>
          builder.where((search) =>
            search
              .whereRaw('title LIKE ?', [searchPattern])
              .orWhereRaw('excerpt LIKE ?', [searchPattern])
              .orWhereRaw('content LIKE ?', [searchPattern])
          )
        )
        .preload('category')
        .preload('author')
        .orderBy('createdAt', sort)
        .paginate(request.input('page', 1), 9),
      Category.query().orderBy('name'),
      Article.query()
        .where('status', 'published')
        .preload('category')
        .preload('author')
        .withAggregate('ratings', (ratingQuery) => {
          ratingQuery.avg('rating').as('averageRating')
        })
        .orderBy('averageRating', 'desc')
        .orderBy('publishedAt', 'desc')
        .limit(5),
    ])

    return inertia.render('home', {
      featured: featured ? (featured.serialize() as any) : null,
      latest: latest.serialize() as any,
      recent: recent.map((article) => article.serialize()) as any,
      articles: articles.serialize() as any,
      sort,
      categories,
      trending: trending.map((article) => ({
        ...article.serialize(),
        averageRating: Number(article.$extras.averageRating ?? 0),
      })) as any,
      query,
    })
  }

  async show({ params, inertia, response }: HttpContext) {
    const article = await Article.query()
      .where('slug', params.slug)
      .where('status', 'published')
      .preload('category')
      .preload('author')
      .first()

    if (!article) return response.notFound()
    const ratingSummary = await ArticleRating.query()
      .where('articleId', article.id)
      .avg('rating as averageRating')
      .count('* as total')
      .first()

    return inertia.render('articles/show', {
      article: article.serialize() as any,
      rating: {
        average: Number(ratingSummary?.$extras.averageRating ?? 0),
        total: Number(ratingSummary?.$extras.total ?? 0),
      },
    })
  }

  async category({ params, request, inertia, response }: HttpContext) {
    const category = await Category.findBy('slug', params.slug)
    if (!category) return response.notFound()

    const articles = await Article.query()
      .where('categoryId', category.id)
      .where('status', 'published')
      .preload('category')
      .preload('author')
      .orderBy('publishedAt', 'desc')
      .paginate(request.input('page', 1), 9)

    return inertia.render('categories/show', { category, articles: articles.serialize() })
  }
}
