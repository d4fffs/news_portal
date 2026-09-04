/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  articles: {
    show: typeof routes['articles.show']
    rating: typeof routes['articles.rating']
  }
  categories: {
    show: typeof routes['categories.show']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  admin: {
    index: typeof routes['admin.index']
    articles: {
      index: typeof routes['admin.articles.index']
      create: typeof routes['admin.articles.create']
      store: typeof routes['admin.articles.store']
      edit: typeof routes['admin.articles.edit']
      update: typeof routes['admin.articles.update']
      destroy: typeof routes['admin.articles.destroy']
      publish: typeof routes['admin.articles.publish']
      unpublish: typeof routes['admin.articles.unpublish']
    }
    categories: {
      index: typeof routes['admin.categories.index']
      create: typeof routes['admin.categories.create']
      store: typeof routes['admin.categories.store']
      edit: typeof routes['admin.categories.edit']
      update: typeof routes['admin.categories.update']
      destroy: typeof routes['admin.categories.destroy']
    }
  }
}
