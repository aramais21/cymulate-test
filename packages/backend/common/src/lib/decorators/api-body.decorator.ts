import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'

export const ApiFormDataBody = (isSingle: boolean, options: { fileCount?: number } = {}) => {
  const properties: { [k: string]: any } = {}
  const { fileCount = 1 } = options
  if (isSingle) {
    properties['file'] = {
      type: 'string',
      format: 'binary'
    }
  } else {
    for (let i = 0; i < fileCount; i++) {
      properties[`file${i}`] = {
        type: 'string',
        format: 'binary'
      }
    }
  }
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties
      }
    })
  )
}
