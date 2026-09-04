import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'articles.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'articles.rating': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.articles.index': { paramsTuple?: []; params?: {} }
    'admin.articles.create': { paramsTuple?: []; params?: {} }
    'admin.articles.store': { paramsTuple?: []; params?: {} }
    'admin.articles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.articles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.articles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.articles.publish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.articles.unpublish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.categories.index': { paramsTuple?: []; params?: {} }
    'admin.categories.create': { paramsTuple?: []; params?: {} }
    'admin.categories.store': { paramsTuple?: []; params?: {} }
    'admin.categories.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'articles.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.articles.index': { paramsTuple?: []; params?: {} }
    'admin.articles.create': { paramsTuple?: []; params?: {} }
    'admin.articles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.categories.index': { paramsTuple?: []; params?: {} }
    'admin.categories.create': { paramsTuple?: []; params?: {} }
    'admin.categories.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'articles.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.articles.index': { paramsTuple?: []; params?: {} }
    'admin.articles.create': { paramsTuple?: []; params?: {} }
    'admin.articles.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.categories.index': { paramsTuple?: []; params?: {} }
    'admin.categories.create': { paramsTuple?: []; params?: {} }
    'admin.categories.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'articles.rating': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'admin.articles.store': { paramsTuple?: []; params?: {} }
    'admin.articles.publish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.articles.unpublish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.categories.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'admin.articles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.articles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}