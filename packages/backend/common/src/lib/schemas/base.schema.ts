import { SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'

export class BaseSchema {
  _id: ObjectId
  created: Date
  updated: Date

  static setupSchema() {
    return SchemaFactory.createForClass(this)
  }
}
