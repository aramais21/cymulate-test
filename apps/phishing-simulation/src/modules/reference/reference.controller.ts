import { Controller, Get, Param, Patch, Post } from '@nestjs/common';

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

  @Patch('/:id')
  @ApiSuccessResponse('boolean')
  async updateReference(@Param('id') id: string) {
    return this.referenceService.updateReferenceToClicked(id)
  }
}
