import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle({ auth, response, session }: HttpContext, next: NextFn) {
    await auth.authenticate()

    if (auth.user?.role !== 'admin') {
      session.flash('error', 'Anda tidak memiliki akses ke panel admin.')
      return response.redirect().toRoute('home')
    }

    return next()
  }
}
