import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../../modules/auth/auth.service';
import { UserDto } from '../../modules/user/user.dto';
import { AccessTokenPayloadDto } from '../../modules/auth/auth.dto';
import { AUTH_HEADER_NAME } from '@cymulate-test/common';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let user: UserDto | null = null;
    try {
      const payload: AccessTokenPayloadDto = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>(''),
        },
      );
      user = await this.authService.getUserByAccessTokenPayload(payload);
    } catch {
      throw new UnauthorizedException();
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    request['user'] = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const { headers } = request;
    return headers[AUTH_HEADER_NAME];
  }
}
