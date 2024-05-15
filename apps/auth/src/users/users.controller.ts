import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create_user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwtauth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserDocument } from './models/userdocument';
import MongooseSerializeInterceptor from '@app/shared/interceptors/mongoose-serializer.interceptor';

@Controller('user')
@UseInterceptors(MongooseSerializeInterceptor(UserDocument))
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@CurrentUser() user: UserDocument) {
    return this.userService.findOne(user._id.toString());
  }

  @Patch(':id')
  updateUser(
    @Body() data: Partial<CreateUserDto>,
    @CurrentUser() user: UserDocument,
  ) {
    return this.userService.update(user._id.toString(), data);
  }
}
