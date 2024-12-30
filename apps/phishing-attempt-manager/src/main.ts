import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { json, urlencoded } from 'express'

import { AUTH_HEADER_NAME } from '@cymulate-test/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get<ConfigService>(ConfigService)
  const port = config.get<number>('port') || 3000

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  const documentConfig = new DocumentBuilder()
    .setTitle('Phishing Attempt Manager microservice')
    .setDescription('Phishing Attempt Manager API')
    .setVersion('1')
    .addApiKey(
      {
        type: 'apiKey',
        name: AUTH_HEADER_NAME,
        in: 'header',
        description: 'The access token',
      },
      AUTH_HEADER_NAME
    )
    .build()
  const document = SwaggerModule.createDocument(app, documentConfig)
  SwaggerModule.setup('docs', app, document)

  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ limit: '50mb', extended: true }))

  await app.listen(port)
}
bootstrap()
