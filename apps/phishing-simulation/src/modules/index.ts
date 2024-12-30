import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailModule, RequestModule } from '@cymulate-test/common';

import { EnvConfigFactory } from '../common/config'
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
  RequestModule,
  ReferenceModule,
  SimulatorModule
]
