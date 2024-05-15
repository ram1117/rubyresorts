import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies?.Refresh || request?.Refresh,
      ]),
      secretOrKey: configService.get('RT_JWT_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(request: any, payload: any) {
    const refreshToken = request?.cookies?.Refresh || request?.Refresh;

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
    return { ...payload, refreshToken };
  }
}
