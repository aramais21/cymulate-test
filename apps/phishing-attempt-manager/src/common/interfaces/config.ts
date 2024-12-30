import { EmailModuleConfig } from '@cymulate-test/common';

export interface Config  extends EmailModuleConfig  {
  port: number
  mongoUrl: string
  jwtSecret: string
  frontEndUrl: string
  bcryptSaltRounds: number
  phishingSimulationServerUrl: string
  serverUrl: string
}
