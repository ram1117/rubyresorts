import { IsMobilePhone, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsMobilePhone()
  mobile: string;
}
