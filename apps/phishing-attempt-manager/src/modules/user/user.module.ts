import { Module } from '@nestjs/common'

import { createMongooseModels } from '@cymulate-test/common';

import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { UserDao } from './user.dao';

@Module({
  imports: [],
  controllers: [],
  providers: [...createMongooseModels([UserSchema]), UserDao, UserService],
  exports: [UserService],
})
export class UserModule {}
