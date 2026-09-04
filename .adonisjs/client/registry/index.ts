/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'articles.show': {
    methods: ["GET","HEAD"],
    pattern: '/berita/:slug',
    tokens: [{"old":"/berita/:slug","type":0,"val":"berita","end":""},{"old":"/berita/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['articles.show']['types'],
  },
  'categories.show': {
    methods: ["GET","HEAD"],
    pattern: '/kategori/:slug',
    tokens: [{"old":"/kategori/:slug","type":0,"val":"kategori","end":""},{"old":"/kategori/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['categories.show']['types'],
  },
  'articles.rating': {
    methods: ["POST"],
    pattern: '/berita/:slug/rating',
    tokens: [{"old":"/berita/:slug/rating","type":0,"val":"berita","end":""},{"old":"/berita/:slug/rating","type":1,"val":"slug","end":""},{"old":"/berita/:slug/rating","type":0,"val":"rating","end":""}],
    types: placeholder as Registry['articles.rating']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'admin.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin',
    tokens: [{"old":"/admin","type":0,"val":"admin","end":""}],
    types: placeholder as Registry['admin.index']['types'],
  },
  'admin.articles.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles',
    tokens: [{"old":"/admin/articles","type":0,"val":"admin","end":""},{"old":"/admin/articles","type":0,"val":"articles","end":""}],
    types: placeholder as Registry['admin.articles.index']['types'],
  },
  'admin.articles.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles/create',
    tokens: [{"old":"/admin/articles/create","type":0,"val":"admin","end":""},{"old":"/admin/articles/create","type":0,"val":"articles","end":""},{"old":"/admin/articles/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.articles.create']['types'],
  },
  'admin.articles.store': {
    methods: ["POST"],
    pattern: '/admin/articles',
    tokens: [{"old":"/admin/articles","type":0,"val":"admin","end":""},{"old":"/admin/articles","type":0,"val":"articles","end":""}],
    types: placeholder as Registry['admin.articles.store']['types'],
  },
  'admin.articles.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/articles/:id/edit',
    tokens: [{"old":"/admin/articles/:id/edit","type":0,"val":"admin","end":""},{"old":"/admin/articles/:id/edit","type":0,"val":"articles","end":""},{"old":"/admin/articles/:id/edit","type":1,"val":"id","end":""},{"old":"/admin/articles/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.articles.edit']['types'],
  },
  'admin.articles.update': {
    methods: ["PATCH"],
    pattern: '/admin/articles/:id',
    tokens: [{"old":"/admin/articles/:id","type":0,"val":"admin","end":""},{"old":"/admin/articles/:id","type":0,"val":"articles","end":""},{"old":"/admin/articles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.articles.update']['types'],
  },
  'admin.articles.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/articles/:id',
    tokens: [{"old":"/admin/articles/:id","type":0,"val":"admin","end":""},{"old":"/admin/articles/:id","type":0,"val":"articles","end":""},{"old":"/admin/articles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.articles.destroy']['types'],
  },
  'admin.articles.publish': {
    methods: ["POST"],
    pattern: '/admin/articles/:id/publish',
    tokens: [{"old":"/admin/articles/:id/publish","type":0,"val":"admin","end":""},{"old":"/admin/articles/:id/publish","type":0,"val":"articles","end":""},{"old":"/admin/articles/:id/publish","type":1,"val":"id","end":""},{"old":"/admin/articles/:id/publish","type":0,"val":"publish","end":""}],
    types: placeholder as Registry['admin.articles.publish']['types'],
  },
  'admin.articles.unpublish': {
    methods: ["POST"],
    pattern: '/admin/articles/:id/unpublish',
    tokens: [{"old":"/admin/articles/:id/unpublish","type":0,"val":"admin","end":""},{"old":"/admin/articles/:id/unpublish","type":0,"val":"articles","end":""},{"old":"/admin/articles/:id/unpublish","type":1,"val":"id","end":""},{"old":"/admin/articles/:id/unpublish","type":0,"val":"unpublish","end":""}],
    types: placeholder as Registry['admin.articles.unpublish']['types'],
  },
  'admin.categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/categories',
    tokens: [{"old":"/admin/categories","type":0,"val":"admin","end":""},{"old":"/admin/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['admin.categories.index']['types'],
  },
  'admin.categories.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/categories/create',
    tokens: [{"old":"/admin/categories/create","type":0,"val":"admin","end":""},{"old":"/admin/categories/create","type":0,"val":"categories","end":""},{"old":"/admin/categories/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.categories.create']['types'],
  },
  'admin.categories.store': {
    methods: ["POST"],
    pattern: '/admin/categories',
    tokens: [{"old":"/admin/categories","type":0,"val":"admin","end":""},{"old":"/admin/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['admin.categories.store']['types'],
  },
  'admin.categories.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/categories/:id/edit',
    tokens: [{"old":"/admin/categories/:id/edit","type":0,"val":"admin","end":""},{"old":"/admin/categories/:id/edit","type":0,"val":"categories","end":""},{"old":"/admin/categories/:id/edit","type":1,"val":"id","end":""},{"old":"/admin/categories/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.categories.edit']['types'],
  },
  'admin.categories.update': {
    methods: ["PATCH"],
    pattern: '/admin/categories/:id',
    tokens: [{"old":"/admin/categories/:id","type":0,"val":"admin","end":""},{"old":"/admin/categories/:id","type":0,"val":"categories","end":""},{"old":"/admin/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.categories.update']['types'],
  },
  'admin.categories.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/categories/:id',
    tokens: [{"old":"/admin/categories/:id","type":0,"val":"admin","end":""},{"old":"/admin/categories/:id","type":0,"val":"categories","end":""},{"old":"/admin/categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.categories.destroy']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
