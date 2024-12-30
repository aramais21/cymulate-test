import { Module } from '@nestjs/common'

import { MODULES } from './modules';

@Module({
  imports: [...MODULES],
  controllers: [],
  providers: []
})
export class AppModule {}
