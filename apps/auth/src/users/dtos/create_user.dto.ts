import {
  IsEmail,
  IsMobilePhone,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  @MinLength(8, { message: 'Should be atleast 8 characters' })
  username: string;

  @IsString()
  fullname: string;

  @IsString()
  address: string;

  @IsMobilePhone()
  mobile: string;
}
