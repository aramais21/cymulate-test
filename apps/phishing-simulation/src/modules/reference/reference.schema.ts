import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema } from '@cymulate-test/common';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
  collection: 'references'
})
export class ReferenceSchema extends BaseSchema {
  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  callbackUrl: string

  @Prop({ required: true })
  externalId: string
}
