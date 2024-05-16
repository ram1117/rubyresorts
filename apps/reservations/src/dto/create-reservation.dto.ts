import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateReservationDto {
  @Type(() => Date)
  @IsDate()
  todate: Date;

  @Type(() => Date)
  @IsDate()
  fromdate: Date;

  @IsNumber()
  @Min(1)
  no_of_rooms: number;

  @IsNumber()
  @Min(1)
  guest_count: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsNumber()
  @Min(1)
  total_price: number;

  @IsString()
  roomtype: string;
}
