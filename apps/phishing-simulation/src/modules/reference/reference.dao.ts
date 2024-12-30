import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ReferenceSchema } from './reference.schema';
import { ReferenceCreationDto, ReferenceDto } from './reference.dto';

@Injectable()
export class ReferenceDao {
  constructor(
    @InjectModel(ReferenceSchema.name)
    private model: Model<ReferenceSchema & Document>
  ) {}

  async create(data: ReferenceCreationDto) {
    const model = await this.model.create(data)
    return model.save()
  }

  findByExternalId(externalId: string): Promise<ReferenceDto[]> {
    return this.model.find({ externalId })
  }

  findById(id: string) {
    return this.model.findById(id)
  }
}
