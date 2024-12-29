import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema } from '@cymulate-test/common';

import { ReferenceStatusEnum } from './reference.dto';

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

  @Prop({
    required: true,
    type: String,
    enum: Object.values(ReferenceStatusEnum),
    default: ReferenceStatusEnum.Created
  })
  status: ReferenceStatusEnum

  @Prop({ required: true })
  externalId: string
}
