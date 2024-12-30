import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { BaseSchema } from '@cymulate-test/common';

import { UserSchema } from '../user/user.schema';
import { TokenTypesEnum } from './temporary-token.dto';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  toObject: {
    getters: true,
  },
  collection: 'temporary-tokens',
})
export class TemporaryTokenSchema extends BaseSchema {
  @Prop({ unique: true, required: true, index: true })
  token: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: UserSchema;

  @Prop({ required: true })
  expirationDate: Date;

  @Prop()
  isUsed: boolean;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(TokenTypesEnum),
  })
  type: TokenTypesEnum;
}
