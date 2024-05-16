import { Type } from 'class-transformer';
import {
  // IsDate,
  // IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateReservationDto {
  // @IsISO8601()
  @Type(() => Date)
  fromdate: Date;

  // @IsISO8601()
  @Type(() => Date)
  todate: Date;

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
