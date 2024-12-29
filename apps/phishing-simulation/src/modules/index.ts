import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvConfigFactory } from '../common/config'
import { EmailModule } from './email/email.module';
import { ReferenceModule } from './reference/reference.module';
import { SimulatorModule } from './simulator/simulator.module';

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
  EmailModule,
  ReferenceModule,
  SimulatorModule
]
