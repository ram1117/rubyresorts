import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SigninDto } from './users/dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(payload: any) {
    return Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('AT_JWT_SECRET'),
        expiresIn: this.configService.get('AT_EXPIRY'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('RT_JWT_SECRET'),
        expiresIn: this.configService.get('RT_EXPIRY'),
      }),
    ]);
  }

  async updateRefreshToken(_id: string, refreshToken: string) {
    const hashedRT = await hash(refreshToken, 10);
    await this.userService.update(_id, { hashedRT });
  }

  async signin(signinDto: SigninDto, response: any) {
    const user = await this.userService.validateUser(signinDto);

    const payload = { sid: user._id.toString(), role: user.role };

    const [accessToken, refreshToken] = await this.generateTokens(payload);

    response.cookie('Authentication', accessToken, { httpOnly: true });
    response.cookie('Refresh', refreshToken, { httpOnly: true });

    await this.updateRefreshToken(user._id.toString(), refreshToken);
  }
}
