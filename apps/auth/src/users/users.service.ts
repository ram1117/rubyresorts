import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dtos/create_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async isUniqueUser(email: string) {
    try {
      await this.userRepo.findOne({ email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }

  async create(createUserDto: CreateUserDto) {
    await this.isUniqueUser(createUserDto.email);

    return await this.userRepo.create({
      ...createUserDto,
      verified: false,
      role: 'user',
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  findOne(_id: string) {
    return this.userRepo.findById(_id);
  }
}
