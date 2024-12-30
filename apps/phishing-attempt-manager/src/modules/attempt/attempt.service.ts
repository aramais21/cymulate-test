import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RequestService } from '@cymulate-test/common';

import { UserDto } from '../user/user.dto';
import { AttemptCreationDto, AttemptDto, AttemptPaginationDto, HandleAttemptNotify } from './attempt.dto';
import { AttemptDao } from './attempt.dao';

@Injectable()
export class AttemptService {
  constructor(
    private readonly attemptDao: AttemptDao,
    private readonly requestService: RequestService,
    private readonly configService: ConfigService,
  ) {}

  async createAttempt(user: UserDto, data: AttemptCreationDto) {
    const attempt = await this.attemptDao.create({
      ...data,
      userId: user._id.toString()
    })
    return this.requestService.post(`${this.configService.get<string>('phishingSimulationServerUrl')}/phishing/send`, {
      email: attempt.email,
      externalId: attempt._id.toString(),
      callbackUrl: `${this.configService.get<string>('serverUrl')}/attempt/notify`
    })
  }

  async getAttempts( user: UserDto, data: AttemptPaginationDto): Promise<AttemptDto[]> {
    return this.attemptDao.findByUserId(user._id.toString(), data)
  }

  async handleNotification({ externalId }: HandleAttemptNotify) {
    return this.attemptDao.updateByIdAndMarkClicked(externalId)
  }
}
