import { MAIL_TYPE } from '@app/shared/constants';
import { Type } from 'class-transformer';
import { IsEmail, IsString, ValidateNested } from 'class-validator';

class UserDto {
  @IsString()
  _id: string;

  @IsString()
  fullname: string;

  @IsEmail()
  email: string;
}

export class PayloadDto {
  @IsString()
  template: MAIL_TYPE;

  @Type(() => UserDto)
  @ValidateNested()
  user: UserDto;

  @IsString()
  link: string;
}
