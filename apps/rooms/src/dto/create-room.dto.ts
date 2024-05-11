import { IsString, IsNumber, IsArray } from 'class-validator';
import { AmenityDocument } from '../model/amenity.model';
import { PriceDocument } from '../model/price.model';
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

  price: PriceDocument;
}
