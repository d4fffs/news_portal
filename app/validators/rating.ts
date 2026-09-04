import vine from '@vinejs/vine'

export const ratingValidator = vine.create({
  rating: vine.number().min(1).max(5),
})
