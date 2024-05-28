import { IsMobilePhone } from 'class-validator';

export class UpdateUserDto {
  @IsMobilePhone()
  mobile: string;
}
