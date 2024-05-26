import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  total: number;

  @IsString()
  reservation_id: string;

  @IsString()
  payment_id: string;
}
