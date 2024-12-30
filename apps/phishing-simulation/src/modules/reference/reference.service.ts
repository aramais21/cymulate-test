import { Injectable, NotFoundException } from '@nestjs/common';

import { RequestService } from '@cymulate-test/common';

import { ReferenceDao } from './reference.dao';
import { ReferenceCreationDto, ReferenceDto } from './reference.dto';

@Injectable()
export class ReferenceService {
  constructor(
    private readonly referenceDao: ReferenceDao,
    private readonly requestService: RequestService,
  ) {}

  createReference(data: ReferenceCreationDto) {
    return this.referenceDao.create(data)
  }

  getByExternalId(externalId: string): Promise<ReferenceDto[]> {
    return this.referenceDao.findByExternalId(externalId)
  }

  async handleReferenceClick(id: string) {
    const reference = await this.referenceDao.findById(id)
    if (!reference) {
      throw new NotFoundException(`Reference id ${id} not found`)
    }
    return this.requestService.post(reference.callbackUrl, { externalId: reference.externalId, email: reference.email })
  }
}
