import { EmailModuleConfig } from '@cymulate-test/common';

export interface Config extends EmailModuleConfig {
  port: number
  mongoUrl: string
  selfUrl: string
}
