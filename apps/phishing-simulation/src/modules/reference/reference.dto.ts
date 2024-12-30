import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  callbackUrl: string
}

export class ReferenceDto extends ReferenceCreationDto {
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
