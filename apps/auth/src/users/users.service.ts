import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dtos/create_user.dto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dtos/signin.dto';
import { UserEntity } from './entities/user.entity';

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

  async findOne(_id: string) {
    const user = await this.userRepo.findById(_id);
    return new UserEntity(user);
  }

  async find(email: string) {
    return this.userRepo.findOne({ email });
  }

  update(_id: string, updateData: Partial<CreateUserDto>) {
    return this.userRepo.findAndUpdateById(_id, updateData);
  }

  async validateUser({ username, password }: SigninDto) {
    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new NotFoundException('Use not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong password');
    }
    return user;
  }
}
