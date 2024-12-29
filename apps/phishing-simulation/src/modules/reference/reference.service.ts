import { Injectable, NotFoundException } from '@nestjs/common';

import { ReferenceDao } from './reference.dao';
import { ReferenceCreationDto, ReferenceDto, ReferenceStatusEnum } from './reference.dto';

@Injectable()
export class ReferenceService {
  constructor(
    private readonly referenceDao: ReferenceDao
  ) {}

  createReference(data: ReferenceCreationDto) {
    return this.referenceDao.create(data)
  }

  getByExternalId(externalId: string): Promise<ReferenceDto[]> {
    return this.referenceDao.findByExternalId(externalId)
  }

  async updateReferenceToClicked(id: string) {
    const reference = await this.referenceDao.findById(id)
    if (!reference) {
      throw new NotFoundException(`Reference id ${id} not found`)
    }
    return this.referenceDao.findOneAndUpdateStatusById(id, ReferenceStatusEnum.Clicked)
  }
}
