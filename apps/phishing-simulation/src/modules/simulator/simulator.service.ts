import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmailService } from '@cymulate-test/common';

import { ReferenceService } from '../reference/reference.service';
import { SimulatorDto } from './simulator.dto';

@Injectable()
export class SimulatorService {
  constructor(
    private readonly emailService: EmailService,
    private readonly referenceService: ReferenceService,
    private readonly configService: ConfigService
  ) {}

  async send(data: SimulatorDto) {
    const reference = await this.referenceService.createReference(data)
    await this.emailService.sendEmail(data.email, { subject: 'IMPORTANT VERIFY ASAP', html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #ddd; padding: 20px; border-radius: 5px;">
    <h2 style="color: #333;">Welcome to Our Service</h2>
    <p style="color: #555;">Thank you for signing up! We’re excited to have you on board.</p>
    <p style="color: #555;">Click the link below to verify your email address and get started:</p>
    <p style="text-align: center;">
      <a href="${this.configService.get('selfUrl')}/reference/click/${reference._id}" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Your Email</a>
    </p>
    <p style="color: #999; font-size: 12px;">If you didn’t sign up for this service, you can safely ignore this email.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      &copy; 2024 Your Company. All rights reserved.
    </p>
  </div>
</body>
</html>
` })
  }
}
