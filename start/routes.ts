/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.Public, 'home']).as('home')
router.get('/berita/:slug', [controllers.Public, 'show']).as('articles.show')
router.get('/kategori/:slug', [controllers.Public, 'category']).as('categories.show')

router
  .group(() => {
    router.post('/berita/:slug/rating', [controllers.ArticleRatings, 'store']).as('articles.rating')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/', [controllers.Admin, 'index']).as('index')
    router
      .group(() => {
        router.get('/', [controllers.AdminArticles, 'index']).as('index')
        router.get('/create', [controllers.AdminArticles, 'create']).as('create')
        router.post('/', [controllers.AdminArticles, 'store']).as('store')
        router.get('/:id/edit', [controllers.AdminArticles, 'edit']).as('edit')
        router.patch('/:id', [controllers.AdminArticles, 'update']).as('update')
        router.delete('/:id', [controllers.AdminArticles, 'destroy']).as('destroy')
        router.post('/:id/publish', [controllers.AdminArticles, 'publish']).as('publish')
        router.post('/:id/unpublish', [controllers.AdminArticles, 'unpublish']).as('unpublish')
      })
      .prefix('articles')
      .as('articles')
    router
      .group(() => {
        router.get('/', [controllers.AdminCategories, 'index']).as('index')
        router.get('/create', [controllers.AdminCategories, 'create']).as('create')
        router.post('/', [controllers.AdminCategories, 'store']).as('store')
        router.get('/:id/edit', [controllers.AdminCategories, 'edit']).as('edit')
        router.patch('/:id', [controllers.AdminCategories, 'update']).as('update')
        router.delete('/:id', [controllers.AdminCategories, 'destroy']).as('destroy')
      })
      .prefix('categories')
      .as('categories')
  })
  .prefix('admin')
  .as('admin')
  .use(middleware.admin())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
