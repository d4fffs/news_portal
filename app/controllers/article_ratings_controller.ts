import Article from '#models/article'
import ArticleRating from '#models/article_rating'
import { ratingValidator } from '#validators/rating'
import type { HttpContext } from '@adonisjs/core/http'

export default class ArticleRatingsController {
  async store({ params, request, auth, response, session }: HttpContext) {
    const article = await Article.findBy('slug', params.slug)
    if (!article || article.status !== 'published') return response.notFound()

    const { rating } = await request.validateUsing(ratingValidator)
    await ArticleRating.updateOrCreate({ articleId: article.id, userId: auth.user!.id }, { rating })

    session.flash('success', 'Rating artikel berhasil disimpan.')
    return response.redirect().back()
  }
}
