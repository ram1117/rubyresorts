import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwtauth.guard';
import { CurrentUser } from '../../../../libs/shared/src/decorators/current-user.decorator';
import { UserDocument } from '../../../../libs/shared/src/models/userdocument';
import MongooseSerializeInterceptor from '@app/shared/interceptors/mongoose-serializer.interceptor';
import { UpdateUserDto } from './dtos/update_user.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
@UseInterceptors(MongooseSerializeInterceptor(UserDocument))
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getUser(@CurrentUser() user: UserDocument) {
    return this.userService.findOne(user._id.toString());
  }

  @Patch(':id')
  updateUser(
    @Body() data: Partial<UpdateUserDto>,
    @CurrentUser() user: UserDocument,
  ) {
    return this.userService.update(user._id.toString(), data);
  }
}
