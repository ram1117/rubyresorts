import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './users/dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: any,
  ) {
    await this.authService.signin(signinDto, res);
    return { message: 'signin in successful' };
  }
}
