import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create_user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  signup(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get(':id')
  getUser(@Param('id') _id: string) {
    return this.userService.findOne(_id);
  }
}
