import { IsEmail, IsString, Length } from 'class-validator';

export class OtpDto {
  @IsString()
  @Length(6)
  otp: string;

  @IsEmail()
  email: string;
}
