import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsDate()
  fromdate: Date;

  @IsDate()
  todate: Date;

  @IsNumber()
  @Min(1)
  rooms_count: number;

  @IsString()
  status: string;

  @IsString()
  room_type: string;
}
