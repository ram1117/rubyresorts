import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SigninDto } from './users/dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signin(signinDto: SigninDto, response: any) {
    const user = await this.userService.validateUser(signinDto);

    const payload = { sid: user._id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('AT_EXPIRY'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('RT_EXPIRY'),
    });

    response.cookie('Authentication', accessToken, { httpOnly: true });
    response.cookie('Refresh', refreshToken, { httpOnly: true });
  }
}
