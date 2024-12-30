import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  getSchemaPath,
  ApiExtraModels,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiResponseDto } from '@cymulate-test/common';

import { AuthGuard } from '../guards';

export function AccessControl() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiExtraModels(ApiResponseDto),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        $ref: getSchemaPath(ApiResponseDto),
      },
    }),
  );
}
