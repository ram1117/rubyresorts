import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class CheckAvailabilityDto {
  @IsDate()
  fromdate: Date;

  @IsDate()
  todate: Date;

  @IsNumber()
  @Min(1)
  no_of_rooms: number;

  @IsString()
  roomtype: string;
}
