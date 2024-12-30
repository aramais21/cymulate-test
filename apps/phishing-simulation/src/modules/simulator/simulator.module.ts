import { Module } from '@nestjs/common'

import { EmailModule } from '@cymulate-test/common';

import { ReferenceModule } from '../reference/reference.module';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';

@Module({
  imports: [ReferenceModule, EmailModule],
  controllers: [SimulatorController],
  providers: [SimulatorService],
  exports: [SimulatorService],
})
export class SimulatorModule {}
