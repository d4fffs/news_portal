import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    await this.db.from(this.tableName).where('email', 'like', '%@example.com').update({ role: 'admin' })
  }

  async down() {
    await this.db.from(this.tableName).where('email', 'like', '%@example.com').update({ role: 'user' })
  }
}