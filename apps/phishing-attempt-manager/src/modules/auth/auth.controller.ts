import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserCreationDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { ApiSuccessResponse } from '@cymulate-test/common';
import {
  AuthResponseDto,
  EmailVerifyDto,
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenBodyDto,
  ResetPasswordDto
} from './auth.dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-up')
  @ApiSuccessResponse('boolean', true)
  async signUp(@Body() data: UserCreationDto) {
    try {
      await this.authService.signUp(data);
      return {
        success: true,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }

  @Post('/log-in')
  @ApiSuccessResponse(AuthResponseDto, true)
  async logIn(@Body() data: LoginDto) {
    try {
      const response: AuthResponseDto = await this.authService.logIn(data);
      return {
        success: true,
        response,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }

  @Post('/refresh-token')
  @ApiSuccessResponse(AuthResponseDto, true)
  async refreshToken(@Body() data: RefreshTokenBodyDto) {
    try {
      const response = await this.authService.refreshAccessToken(data);
      return {
        success: true,
        response,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }

  @Post('/email-verify')
  @ApiSuccessResponse(AuthResponseDto, true)
  async emailVerify(@Body() data: EmailVerifyDto) {
    try {
      const response: AuthResponseDto =
        await this.authService.verifyEmail(data);
      return {
        success: true,
        response,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }

  @Post('/forgot-password')
  @ApiSuccessResponse(AuthResponseDto, true)
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    try {
      await this.authService.sendRecoveryEmail(data.email);
      return {
        success: true,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }

  @Post('/reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    try {
      await this.authService.resetPassword(data);
      return {
        success: true,
      };
    } catch (err) {
      throw new BadRequestException({
        success: false,
        message: err.message,
      });
    }
  }
}
