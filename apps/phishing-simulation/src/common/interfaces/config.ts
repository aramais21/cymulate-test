export interface SMTPConfig {
  user: string
  password: string
  from: string
}


export interface Config {
  port: number
  mongoUrl: string
  smtp: SMTPConfig
  frontendUrl: string
}
