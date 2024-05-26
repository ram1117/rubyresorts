import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './users/dtos/signin.dto';
import { JwtAuthGuard } from './guards/jwtauth.guard';
import { CurrentUser } from '../../../libs/shared/src/decorators/current-user.decorator';
import { JwtRefreshGuard } from './guards/jwtrefresh.guard';
import { CreateUserDto } from './users/dtos/create_user.dto';
import { ForgotPasswordDto } from './users/dtos/forgot_pwd.dto';
import { MessagePattern } from '@nestjs/microservices';
import { SERVICE_PATTERNS } from '@app/shared/constants';
import { OtpDto } from './users/dtos/otp.dto';
import { UpdatePasswordDto } from './users/dtos/update_password.dto';
import { VerifyEmailDto } from './users/dtos/verify_email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserdto: CreateUserDto) {
    return this.authService.signup(createUserdto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto) {
    return await this.authService.signin(signinDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(@CurrentUser() user: any) {
    await this.authService.signout(user._id.toString());
    return { message: 'signout successful' };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(@CurrentUser() { sub, refreshToken }: any) {
    const token = await this.authService.refresh(sub, refreshToken);
    return { token };
  }

  @Post('forgotpassword')
  async forgotpassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.sendOtp(forgotPasswordDto.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sendverification')
  async sendVerification(@CurrentUser() user: any) {
    return this.authService.sendVerification(user._id);
  }

  @Post('verifyemail')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto.token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatepassword')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @CurrentUser() user: any,
  ) {
    return this.authService.updatePassword(user._id, updatePasswordDto);
  }

  @Post('submitotp')
  async validateOtp(@Body() otpDto: OtpDto) {
    return this.authService.validateOtp(otpDto);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: SERVICE_PATTERNS.AUTH })
  authenticate(@CurrentUser() user: any) {
    return user;
  }
}
