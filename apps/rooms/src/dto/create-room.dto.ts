import { IsString, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  total: number;
}
