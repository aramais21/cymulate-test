import { Controller, Param, Patch, Post } from '@nestjs/common';

import { ApiSuccessResponse } from '@cymulate-test/common';

import { SimulatorService } from './simulator.service';
import { SimulatorDto } from './simulator.dto';

@Controller('phishing')
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Post('/send')
  @ApiSuccessResponse('boolean')
  async sendPhishingEmail(data: SimulatorDto) {
    return this.simulatorService.send(data)
  }
}