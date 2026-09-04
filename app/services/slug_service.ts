import db from '@adonisjs/lucid/services/db'

export function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function uniqueSlug(
  value: string,
  table: 'categories' | 'articles',
  ignoredId?: number
) {
  const base = makeSlug(value) || 'untitled'
  let slug = base
  let suffix = 1

  while (
    await db
      .from(table)
      .where('slug', slug)
      .if(ignoredId, (query) => query.whereNot('id', ignoredId!))
      .first()
  ) {
    slug = `${base}-${suffix++}`
  }

  return slug
}
