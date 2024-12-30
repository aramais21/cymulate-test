import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user/user.dto';

export class AuthResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;

  user: UserDto;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class RefreshTokenBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}

export class EmailVerifyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}

export class AccessTokenPayloadDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sub: string;
}

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
