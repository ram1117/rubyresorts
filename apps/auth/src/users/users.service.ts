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
import { UpdateUserDto } from './dtos/update_user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async isUniqueUser(email: string) {
    const user = await this.userRepo.findOne({ email });
    if (user) throw new UnprocessableEntityException('Email already exists');
    return;
  }

  async create(createUserDto: CreateUserDto) {
    await this.isUniqueUser(createUserDto.email);
    return await this.userRepo.create({
      ...createUserDto,
      verified: false,
      role: 'user',
      password: await bcrypt.hash(createUserDto.password, 10),
      hashedRT: '',
      otp: '',
      otpExpiry: null,
    });
  }

  async findOne(_id: string) {
    const user = await this.userRepo.findById(_id);
    return new UserEntity(user);
  }

  async find(email: string) {
    return this.userRepo.findOne({ email });
  }

  update(_id: string, updateData: Partial<UpdateUserDto>) {
    return this.userRepo.findAndUpdateById(_id, updateData);
  }

  updateOtp(_id: string, updateData: { otp: string | null; otpExpiry: Date }) {
    return this.userRepo.findAndUpdateById(_id, updateData);
  }

  async updatePassword(_id: string, updateData: { password: string }) {
    return this.userRepo.findAndUpdateById(_id, {
      password: await bcrypt.hash(updateData.password, 10),
    });
  }

  async updateVerification(_id: string) {
    await this.userRepo.findAndUpdateById(_id, { verified: true });
  }

  updateRefreshToken(_id: string, hashedRT: { hashedRT: string | null }) {
    return this.userRepo.findAndUpdateById(_id, hashedRT);
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
