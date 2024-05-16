import { IsString } from 'class-validator';

export class UpdateReservationDto {
  @IsString()
  status: string;
}
