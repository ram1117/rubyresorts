import {
  IsDate,
  IsMobilePhone,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsMobilePhone()
  mobile: string;

  @IsString()
  @Length(6)
  otp: string;

  @IsDate()
  otpExpiry: Date;
}
