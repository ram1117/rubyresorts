import {
  IsEmail,
  IsMobilePhone,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  fullname: string;

  @IsString()
  address: string;

  @IsMobilePhone()
  mobile: string;
}
