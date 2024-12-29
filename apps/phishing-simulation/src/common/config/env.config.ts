import 'dotenv/config'
import { Config } from '../interfaces';
import * as process from 'node:process';


export const EnvConfigFactory = (): Config => ({
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
  mongoUrl: process.env.MONGO_URL || '',
  smtp: {
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.SMTP_FROM || ''
  },
  frontendUrl: process.env.FRONT_END_URL || ''
})
