import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export enum TokenTypesEnum {
  Refresh = 'Refresh',
  OneTime = 'OneTime',
}

export class BaseTokenCreationDto {
  @IsMongoId()
  @Type(() => ObjectId)
  @ApiProperty()
  userId: ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  expirationDate: Date;
}

export class InternalTokenCreationDto extends BaseTokenCreationDto {
  @IsEnum(TokenTypesEnum)
  @ApiProperty({
    enum: TokenTypesEnum,
    enumName: 'TokenTypesEnum',
  })
  type: TokenTypesEnum;
}

export class InternalTokenDto extends InternalTokenCreationDto {
  @IsBoolean()
  @ApiProperty()
  isUsed: boolean;
}
