import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemporaryTokenSchema } from './temporary-token.schema';
import { InternalTokenCreationDto, TokenTypesEnum } from './temporary-token.dto';


@Injectable()
export class TemporaryTokenDao {
  constructor(
    @InjectModel(TemporaryTokenSchema.name)
    private model: Model<TemporaryTokenSchema & Document>,
  ) {}

  upsert(data: InternalTokenCreationDto) {
    return this.model.updateOne(
      {
        token: data.token,
        userId: data.userId,
        type: data.type,
      },
      {
        $set: {
          isUsed: false,
          expirationDate: data.expirationDate,
        },
      },
      {
        upsert: true,
      },
    );
  }

  invalidateAllValidRefreshTokensForUser(userId: string) {
    return this.model.updateMany(
      {
        userId,
        isUsed: false,
        expirationDate: { $gte: new Date() },
        type: TokenTypesEnum.Refresh,
      },
      { $set: { isUsed: true } },
    );
  }

  invalidateToken(token: string) {
    return this.model.updateOne({ token }, { $set: { isUsed: true } });
  }

  findOneToken(token: string, type = TokenTypesEnum.Refresh) {
    return this.model.findOne({ token, type });
  }
}
