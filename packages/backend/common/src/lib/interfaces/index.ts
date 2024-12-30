export interface SMTPConfig {
  user: string
  password: string
  from: string
}

export interface EmailModuleConfig {
  smtp: SMTPConfig
}
