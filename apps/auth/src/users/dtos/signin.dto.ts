import { IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsString()
  @MinLength(8)
  username: string;
  @IsString()
  password: string;
}
