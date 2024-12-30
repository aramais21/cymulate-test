import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { createMongooseModels, RequestModule } from '@cymulate-test/common';

import { AttemptController } from './attempt.controller';
import { AttemptSchema } from './attempt.schema';
import { AttemptDao } from './attempt.dao';
import { AttemptService } from './attempt.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    RequestModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        global: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
  controllers: [AttemptController],
  providers: [...createMongooseModels([AttemptSchema]), AttemptDao, AttemptService],
  exports: [AttemptService],
})
export class AttemptModule {}
