import { Prop, Schema } from '@nestjs/mongoose';
import { BaseSchema } from '@cymulate-test/common';

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
  toObject: {
    getters: true,
  },
  collection: 'users',
  autoIndex: true,
})
export class UserSchema extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  activationDate: Date;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: false })
  isEmailVerified: boolean;
}
