import { Exclude } from 'class-transformer';

export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  email: string;
  fullname: string;
  address: string;
  mobile: string;

  @Exclude()
  password: string;
}
