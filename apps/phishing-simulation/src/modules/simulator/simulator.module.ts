import { Module } from '@nestjs/common'
import { EmailModule } from '../email/email.module';
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
