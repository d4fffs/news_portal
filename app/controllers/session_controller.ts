import User from '#models/user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    let user
    try {
      user = await User.verifyCredentials(email, password)
    } catch {
      session.flash('error', 'Email atau password yang Anda masukkan salah.')
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    response.redirect().toRoute(user.role === 'admin' ? 'admin.index' : 'home')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('session.create')
  }
}
