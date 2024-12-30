import { Module } from '@nestjs/common'

import { createMongooseModels, EmailModule } from '@cymulate-test/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TemporaryTokenSchema } from './temporary-token.schema';
import { TemporaryTokenDao } from './temporary-token.dao';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EmailModule
  ],
  controllers: [AuthController],
  providers: [...createMongooseModels([TemporaryTokenSchema]), TemporaryTokenDao, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
