import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { EnvConfigFactory } from '../common/config'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from '@cymulate-test/common';
import { AttemptModule } from './attempt/attempt.module';

export const MODULES = [
  ConfigModule.forRoot({
    load: [EnvConfigFactory],
    isGlobal: true
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('mongoUrl')
    }),
    inject: [ConfigService]
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('jwtSecret'),
      global: true,
    }),
    inject: [ConfigService],
  }),
  EmailModule,
  UserModule,
  AuthModule,
  AttemptModule
]
