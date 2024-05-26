import { IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @IsStrongPassword()
  password: string;
}
