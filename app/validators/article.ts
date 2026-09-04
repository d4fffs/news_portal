import vine from '@vinejs/vine'

export const articleValidator = vine.create({
  title: vine.string().trim().minLength(5).maxLength(255),
  categoryId: vine.number().exists({ table: 'categories', column: 'id' }),
  excerpt: vine.string().trim().maxLength(500).optional(),
  content: vine.string().trim().minLength(20),
  status: vine.enum(['draft', 'published'] as const),
})
