import { Global, Module } from '@nestjs/common'

import { RequestService } from './request.service'

@Global()
@Module({
  imports: [],
  providers: [RequestService],
  exports: [RequestService]
})
export class RequestModule {}
