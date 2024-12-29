import { createMongooseAsyncProviders } from '@nestjs/mongoose/dist/mongoose.providers'

export * from './base.schema'

export const createMongooseModels = (schemaClasses: any[]) =>
  createMongooseAsyncProviders(
    undefined,
    schemaClasses.map(schemaClass => ({
      name: schemaClass.name,
      useFactory: schemaClass.setupSchema.bind(schemaClass),
      inject: []
    }))
  )
