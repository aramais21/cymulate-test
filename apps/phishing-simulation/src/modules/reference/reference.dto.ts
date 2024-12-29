import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ReferenceStatusEnum {
  Created = 'created',
  Clicked = 'clicked'
}

export class ReferenceCreationDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  externalId: string
}

export class ReferenceDto extends ReferenceCreationDto {
  @IsEnum(ReferenceStatusEnum)
  @ApiProperty({ enum: Object.values(ReferenceStatusEnum), enumName: 'ReferenceStatusEnum', default: ReferenceStatusEnum.Created })
  status: ReferenceStatusEnum

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  _id: string

  @IsDate()
  @ApiProperty()
  created: Date

  @IsDate()
  @ApiProperty()
  updated: Date
}
