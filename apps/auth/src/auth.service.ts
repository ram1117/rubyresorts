import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SigninDto } from './users/dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './users/dtos/create_user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('AT_JWT_SECRET'),
      expiresIn: this.configService.get('AT_EXPIRY'),
    });
  }

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

  async updateRefreshToken(_id: string, refreshToken: string | null) {
    if (refreshToken) {
      const hashedRT = await hash(refreshToken, 10);
      await this.userService.update(_id, { hashedRT });
      return;
    }

    await this.userService.update(_id, { hashedRT: null });
  }

  async signin(signinDto: SigninDto, response: any) {
    const user = await this.userService.validateUser(signinDto);

    const payload = {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    const [accessToken, refreshToken] = await this.generateTokens(payload);

    response.cookie('Authentication', accessToken, { httpOnly: true });
    response.cookie('Refresh', refreshToken, { httpOnly: true });

    await this.updateRefreshToken(user._id.toString(), refreshToken);
  }

  async signup(createuserDto: CreateUserDto) {
    return await this.userService.create(createuserDto);
  }

  async signout(_id: string) {
    await this.updateRefreshToken(_id, null);
  }

  async refresh(id: string, refreshToken: string, response: any) {
    const { _id, role, hashedRT } = await this.userService.findOne(id);
    const isToken = await compare(refreshToken, hashedRT);

    if (!isToken) {
      throw new ForbiddenException('Invalid Refresh token');
    }

    const payload = { sub: _id, role };
    const cookie = await this.generateAccessToken(payload);
    response.cookie('Authentication', cookie, { httpOnly: true });
  }

  async sendOtp(email: string) {
    // const user = await this.userService.find(email);
    return { message: `OTP sent to ${email} ` };
  }
}
