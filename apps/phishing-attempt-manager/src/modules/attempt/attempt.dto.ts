import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class AttemptCreationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

export class AttemptInternalCreationDto extends AttemptCreationDto {
  @ApiProperty()
  @IsMongoId()
  userId: string
}

export class AttemptDto extends AttemptInternalCreationDto {
  @ApiProperty()
  @IsMongoId()
  _id: ObjectId

  @IsDate()
  @ApiProperty({ required: false })
  clickedAt: Date

  @IsBoolean()
  @ApiProperty()
  isClicked: boolean
}

export class AttemptPaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ required: false })
  limit?: number = 20;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ required: false })
  page?: number = 0;
}

export interface HandleAttemptNotify {
  externalId: string;
  email: string;
}
