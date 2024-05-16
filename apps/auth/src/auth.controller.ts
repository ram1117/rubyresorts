import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserdto: CreateUserDto) {
    return this.authService.signup(createUserdto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: any,
  ) {
    await this.authService.signin(signinDto, res);
    return { message: 'signin in successful' };
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
  async refresh(
    @CurrentUser() { sub, refreshToken }: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.refresh(sub, refreshToken, response);
    return { message: 'Token refresh successful' };
  }

  @Post('forgotpassword')
  async forgotpassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.sendOtp(forgotPasswordDto.email);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: SERVICE_PATTERNS.AUTH })
  authenticate(@CurrentUser() user: any) {
    return user;
  }
}
