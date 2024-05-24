import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class CheckAvailabilityDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fromdate: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  todate: Date;

  @IsNumber()
  @Min(1)
  no_of_rooms: number;

  @IsString()
  roomtype: string;
}
