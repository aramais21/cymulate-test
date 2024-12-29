import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

import { AUTH_HEADER_NAME } from '../constants'
import { ApiResponseMetadataDto } from '../dtos'

export const ApiSuccessResponse = (model: any, isPublic = false) => {
  const isPrimitive = ['boolean', 'string', 'number'].includes(model)
  const isArray = Array.isArray(model)
  let swaggerSchema: SchemaObject & Partial<ReferenceObject> = {
    $ref: getSchemaPath(model)
  }
  if (isArray) {
    swaggerSchema = {
      type: 'array',
      items: {
        $ref: getSchemaPath(model[0])
      }
    }
  } else if (isPrimitive) {
    swaggerSchema = {
      type: model
    }
  } else if (model === 'none') {
    swaggerSchema = {}
  }

  return applyDecorators(
    ApiExtraModels(Array.isArray(model) ? model[0] : model),
    ApiOkResponse({
      schema: swaggerSchema
    }),
    ...(isPublic ? [] : [ApiBearerAuth(AUTH_HEADER_NAME)])
  )
}

export const ApiPaginatedSuccessResponse = (model: any, isPublic = false) => {
  const isPrimitive = ['boolean', 'string', 'number'].includes(model)
  const isArray = Array.isArray(model)
  let swaggerSchema: SchemaObject & Partial<ReferenceObject> = {
    $ref: getSchemaPath(model)
  }
  if (isArray) {
    swaggerSchema = {
      type: 'array',
      items: {
        $ref: getSchemaPath(model[0])
      }
    }
  } else if (isPrimitive) {
    swaggerSchema = {
      type: model
    }
  } else if (model === 'none') {
    swaggerSchema = {}
  }

  return applyDecorators(
    ApiExtraModels(ApiResponseMetadataDto),
    ApiExtraModels(Array.isArray(model) ? model[0] : model),
    ApiOkResponse({
      schema: {
        properties: {
          response: swaggerSchema,
          metadata: {
            $ref: getSchemaPath(ApiResponseMetadataDto)
          }
        },
        required: ['success']
      }
    }),
    ...(isPublic ? [] : [ApiBearerAuth(AUTH_HEADER_NAME)])
  )
}
