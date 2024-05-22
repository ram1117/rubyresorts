import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { SigninDto } from './users/dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './users/dtos/create_user.dto';
import { OtpDto } from './users/dtos/otp.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import {
  MAIL_TYPE,
  SERVICE_NAMES,
  SERVICE_PATTERNS,
} from '@app/shared/constants';
import { addMinutes } from 'date-fns';
import { UpdatePasswordDto } from './users/dtos/update_password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(SERVICE_NAMES.MAILER) readonly emailerService: ClientProxy,
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
      await this.userService.updateRefreshToken(_id, { hashedRT });
      return;
    }

    await this.userService.updateRefreshToken(_id, { hashedRT: null });
  }

  async signin(signinDto: SigninDto) {
    const user = await this.userService.validateUser(signinDto);

    const payload = {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    const [accessToken, refreshToken] = await this.generateTokens(payload);
    await this.updateRefreshToken(user._id.toString(), refreshToken);

    return { access: accessToken, refresh: refreshToken, role: user.role };
  }

  async signup(createuserDto: CreateUserDto) {
    return await this.userService.create(createuserDto);
  }

  async signout(_id: string) {
    await this.updateRefreshToken(_id, null);
  }

  async refresh(id: string, refreshToken: string) {
    const { _id, role, hashedRT } = await this.userService.findOne(id);
    const isToken = await compare(refreshToken, hashedRT);

    if (!isToken) {
      throw new ForbiddenException('Invalid Refresh token');
    }

    const payload = { sub: _id, role };
    return await this.generateAccessToken(payload);
  }

  async sendOtp(email: string) {
    const user = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const randomstring = crypto.randomBytes(3).toString('hex').toUpperCase();
    const otp = await bcrypt.hash(randomstring.toLowerCase(), 10);
    const otpExpiry = addMinutes(new Date(), 5);

    await this.userService.updateOtp(user._id.toString(), { otp, otpExpiry });

    this.emailerService.emit(
      { cmd: SERVICE_PATTERNS.MAIL },
      {
        template: MAIL_TYPE.RESET,
        code: randomstring,
        user: { _id: user._id, email: user.email, fullname: user.fullname },
      },
    );
    return { message: `OTP sent to registered Email` };
  }

  async validateOtp(otpDto: OtpDto) {
    const user = await this.userService.find(otpDto.email);
    if (user.otpExpiry < new Date())
      throw new UnprocessableEntityException('OTP has expired');

    const isValidOtp = await bcrypt.compare(otpDto.otp.toLowerCase(), user.otp);

    if (!isValidOtp)
      throw new UnprocessableEntityException('Wrong OTP entered');

    const payload = {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('AT_JWT_SECRET'),
      expiresIn: 180,
    });

    this.userService.updateOtp(user._id.toString(), {
      otp: null,
      otpExpiry: new Date(),
    });

    return {
      message: 'OTP verification successful',
      access: token,
    };
  }

  async updatePassword(_id: string, updatePasswordDto: UpdatePasswordDto) {
    const update = await this.userService.updatePassword(
      _id,
      updatePasswordDto,
    );
    if (!update)
      throw new UnprocessableEntityException('Unable to update password');

    return { message: 'Password updated.' };
  }
}
