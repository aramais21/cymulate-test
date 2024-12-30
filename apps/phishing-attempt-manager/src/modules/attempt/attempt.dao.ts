import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AttemptSchema } from './attempt.schema';
import { AttemptDto, AttemptInternalCreationDto, AttemptPaginationDto } from './attempt.dto';


@Injectable()
export class AttemptDao {
  constructor(
    @InjectModel(AttemptSchema.name)
    private model: Model<Omit<AttemptSchema, 'userId'> & {userId: string } & Document>,
  ) {}

  async create(data: AttemptInternalCreationDto) {
    const newAttempt = await this.model.create(data)
    return newAttempt.save()
  }

  findByUserId(userId: string, { page = 0, limit = 20 }: AttemptPaginationDto): Promise<AttemptDto[]> {
    return this.model.find({ userId }).skip(page * limit).limit(limit)
  }

  updateByIdAndMarkClicked(id: string) {
    return this.model.findByIdAndUpdate(id, { $set: { isClicked: true, clickedAt: new Date() } })
  }
}
