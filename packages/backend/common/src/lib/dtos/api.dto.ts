import { IsNumber, IsOptional, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ required: false })
  limit?: number = 20

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ required: false })
  page?: number = 1
}

export class ApiResponseMetadataDto {
  @IsNumber()
  @ApiProperty()
  totalCount: number

  @IsNumber()
  @ApiProperty()
  totalPages: number

  @IsNumber()
  @ApiProperty()
  currentPage: number

  @IsNumber()
  @ApiProperty()
  limit: number
}

export class ApiResponseDto<R> {
  response: R
  metadata: ApiResponseMetadataDto
}
