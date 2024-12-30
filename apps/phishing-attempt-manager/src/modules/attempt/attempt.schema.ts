import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { BaseSchema } from '@cymulate-test/common';

import { UserSchema } from '../user/user.schema';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  toObject: {
    getters: true,
  },
  collection: 'attempts',
})
export class AttemptSchema extends BaseSchema {
  @Prop({ required: true })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: UserSchema;

  @Prop()
  clickedAt: Date;

  @Prop({ default: false })
  isClicked: boolean;
}
