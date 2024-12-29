import { Module } from '@nestjs/common'

import { createMongooseModels } from '@cymulate-test/common';

import { ReferenceService } from './reference.service';
import { ReferenceSchema } from './reference.schema';
import { ReferenceDao } from './reference.dao';
import { ReferenceController } from './reference.controller';

@Module({
  imports: [],
  controllers: [ReferenceController],
  providers: [...createMongooseModels([ReferenceSchema]), ReferenceDao, ReferenceService],
  exports: [ReferenceService],
})
export class ReferenceModule {}
