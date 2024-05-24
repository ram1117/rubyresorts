import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class CreateReservationDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  todate: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  fromdate: Date;

  @IsNumber()
  @Min(1)
  no_of_rooms: number;

  @IsNumber()
  @Min(1)
  guest_count: number;

  @IsString()
  roomtype: string;
}
