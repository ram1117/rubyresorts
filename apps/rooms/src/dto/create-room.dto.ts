import { IsString, IsNumber, IsArray } from 'class-validator';
import { AmenityDocument } from '../../../../libs/shared/src/models/amenity.model';
import { PriceDocument } from '../../../../libs/shared/src/models/price.model';
import { Types } from 'mongoose';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  order: number;

  @IsNumber()
  total: number;

  @IsArray()
  amenities: Types.Array<AmenityDocument>;

  @IsArray()
  images: string[];

  @IsNumber()
  occupancy: number;

  price: PriceDocument;
}
