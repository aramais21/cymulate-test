import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter
  constructor(
    private readonly configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('smtp.user'),
        pass: this.configService.get('smtp.password')
      }
    })
  }

  async sendEmail(emailTo: string | string[], options: { subject: string, text?: string, html?: string }): Promise<void> {
    const { subject, html, text } = options
    return this.transporter.sendMail({
      from: this.configService.get('smtp.from'),
      to: emailTo,
      subject,
      text,
      html
    })
  }
}
