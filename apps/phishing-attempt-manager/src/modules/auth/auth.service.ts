import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

import { EmailService } from '@cymulate-test/common';

import { UserService } from '../user/user.service';
import { UserCreationDto, UserDto } from '../user/user.dto';
import { TemporaryTokenDao } from './temporary-token.dao';
import { TokenTypesEnum } from './temporary-token.dto';
import {
  AccessTokenPayloadDto,
  AuthResponseDto,
  EmailVerifyDto,
  LoginDto,
  RefreshTokenBodyDto,
  ResetPasswordDto
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly temporaryTokenDao: TemporaryTokenDao,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async signUp(data: UserCreationDto) {
    const user = await this.userService.create(data)
    const verificationToken = uuidv4();
    const verificationUrl = `${this.configService.get<string>(
      'frontEndUrl',
    )}/verify-email/${verificationToken}`;

    await this.temporaryTokenDao.upsert({
      userId: user._id,
      token: verificationToken,
      expirationDate: dayjs().add(1, 'h').toDate(),
      type: TokenTypesEnum.OneTime,
    });

    return this.emailService.sendEmail(data.email, { subject: 'Verify your email address for Cymulate test task', html: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #cccccc; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #222; text-align: center;">Welcome to Cymulate Test Task!</h1>
    <p style="color: #555; font-size: 16px; line-height: 1.5;">
      Thank you for choosing Cymulate Test Task. We're here to help you evaluate and improve your security posture with confidence.
    </p>
    <p style="color: #555; font-size: 16px; line-height: 1.5;">
      To get started, please confirm your email address by clicking the button below:
    </p>
    <p style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" style="display: inline-block; padding: 15px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 50px; font-weight: bold;">Confirm Your Email</a>
    </p>
    <p style="color: #555; font-size: 16px; line-height: 1.5;">
      If you didn’t sign up for Cymulate Test Task, please ignore this email. No further action is required.
    </p>
    <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      &copy; 2024 Cymulate Test Task. All rights reserved.<br>
    </p>
  </div>
</body>
</html>
` });
  }

  async logIn(data: LoginDto): Promise<AuthResponseDto> {
    const { usernameOrEmail, password } = data;
    const user =
      await this.userService.findWithUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    const isPasswordMatching = await compare(password, user.password);
    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid username or password');
    }
    if (!user.isEmailVerified) {
      throw new BadRequestException('email is not verified');
    }
    const generatedTokens: AuthResponseDto = await this.generateTokens(user);
    return {
      user,
      accessToken: generatedTokens.accessToken,
      refreshToken: generatedTokens.refreshToken,
    };
  }

  async refreshAccessToken(
    data: RefreshTokenBodyDto,
  ): Promise<AuthResponseDto> {
    const refreshToken = await this.temporaryTokenDao.findOneToken(
      data.refreshToken,
    );
    if (
      !refreshToken ||
      refreshToken.isUsed ||
      refreshToken.expirationDate <= new Date()
    ) {
      throw new BadRequestException('Invalid token');
    }

    const user = await this.userService.findById(refreshToken.userId as unknown as string);
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    const generatedTokens: AuthResponseDto = await this.generateTokens(user);
    return {
      user,
      accessToken: generatedTokens.accessToken,
      refreshToken: generatedTokens.refreshToken,
    };
  }

  getUserByAccessTokenPayload(payload: AccessTokenPayloadDto) {
    const { sub: userId } = payload;
    return this.userService.findById(userId);
  }

  private async generateTokens(user: UserDto): Promise<AuthResponseDto> {
    const accessPayload: AccessTokenPayloadDto = {
      sub: user._id.toString(),
    };
    await this.temporaryTokenDao.invalidateAllValidRefreshTokensForUser(
      user._id.toString(),
    );
    const accessToken = await this.jwtService.signAsync(accessPayload, {
      expiresIn: '2d',
    });
    const refreshToken = await this.jwtService.signAsync(accessPayload, {
      expiresIn: '7d',
    });
    await this.temporaryTokenDao.upsert({
      token: refreshToken,
      userId: user._id,
      expirationDate: dayjs().add(7, 'd').toDate(),
      type: TokenTypesEnum.Refresh,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async verifyEmail(data: EmailVerifyDto) {
    const tempToken = await this.temporaryTokenDao.findOneToken(
      data.token,
      TokenTypesEnum.OneTime,
    );
    if (
      !tempToken ||
      tempToken.isUsed ||
      tempToken.expirationDate <= new Date()
    ) {
      throw new NotFoundException('not_found');
    }
    await this.temporaryTokenDao.invalidateToken(data.token);
    await this.userService.updateVerificationStatus(
      (tempToken.userId as unknown as ObjectId).toString(),
      {
        isEmailVerified: true,
        activationDate: new Date(),
      },
    );
    const user = await this.userService.findById(
        (tempToken.userId as unknown as ObjectId).toString(),
      );
    if(!user) {
      throw new NotFoundException('not_found');
    }
    return this.generateTokens(user);
  }

  async sendRecoveryEmail(email: string) {
    const user = await this.userService.findWithUsernameOrEmail(email);

    if (!user) {
      throw new BadRequestException('something went wrong');
    }
    const verificationToken = uuidv4();
    const verificationUrl = `${this.configService.get<string>(
      'frontEndUrl',
    )}/reset-password/${verificationToken}`;

    await this.temporaryTokenDao.upsert({
      userId: user._id,
      token: verificationToken,
      expirationDate: dayjs().add(1, 'h').toDate(),
      type: TokenTypesEnum.OneTime,
    });

    return this.emailService.sendEmail(email, { subject: 'Verify your email address for Cymulate test task', html: `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #cccccc; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #222; text-align: center;">Reset Your Password</h1>
    <p style="color: #555; font-size: 16px; line-height: 1.5;">
      Hi there,
    </p>
    <p style="color: #555; font-size: 16px; line-height: 1.5;">
      We received a request to reset your password for your Cymulate Test Task account. If you made this request, click the button below to reset your password:
    </p>
    <p style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" style="display: inline-block; padding: 15px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 50px; font-weight: bold;">Reset Password</a>
    </p>
    <p style="color: #555; font-size: 16px; line-height: 1.5;">
      If you didn’t request a password reset, please ignore this email. Your account is safe and no changes have been made.
    </p>
    <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      &copy; 2024 Cymulate Test Task. All rights reserved.<br>
    </p>
  </div>
</body>
</html>

    ` });
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {
    const tempToken = await this.temporaryTokenDao.findOneToken(
      data.token,
      TokenTypesEnum.OneTime,
    );
    if (!tempToken) {
      throw new BadRequestException('something went wrong');
    }
    const user = await this.userService.findById(
      (tempToken.userId as unknown as ObjectId).toString(),
    );
    if (!user || !user.isEmailVerified) {
      throw new BadRequestException('user is not verified');
    }
    const passwordHash = await hash(
      data.password,
      this.configService.get<string>('bcryptSaltRounds') || '',
    );
    await this.userService.updatePassword(user._id.toString(), passwordHash);

    await this.temporaryTokenDao.invalidateToken(data.token);

    return;
  }
}
