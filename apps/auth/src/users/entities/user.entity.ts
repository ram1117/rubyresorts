import { Exclude, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @Transform((value) => value.obj._id.toString())
  _id: Types.ObjectId;

  @Exclude()
  password: string;

  @Exclude()
  hashedRT: string;

  @Exclude()
  otp: string | null;

  email: string;
  username: string;
  fullname: string;
  verified: boolean;
  role: string;
  mobile: string;
}
