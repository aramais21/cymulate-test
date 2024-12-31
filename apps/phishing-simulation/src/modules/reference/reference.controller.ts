import { Controller, Get, Param } from '@nestjs/common';

import { ApiSuccessResponse } from '@cymulate-test/common';

import { ReferenceService } from './reference.service';
import { ReferenceDto } from './reference.dto';


@Controller('reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get('/:externalId')
  @ApiSuccessResponse([ReferenceDto])
  async getReference(@Param('externalId') externalId: string) {
    return this.referenceService.getByExternalId(externalId)
  }

  @Get('/click/:id')
  @ApiSuccessResponse('boolean')
  async handleReferenceClick(@Param('id') id: string) {
    return this.referenceService.handleReferenceClick(id)
  }
}
