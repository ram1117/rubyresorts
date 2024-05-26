import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Types } from 'mongoose';
import { PriceDocument } from './price.model';
import { AbstractDocument } from '@app/shared';
import { AmenityDocument } from './amenity.model';

@Schema({ versionKey: false })
export class RoomTypeDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  total: number;

  @Prop()
  order: number;

  @Prop({ type: [AmenityDocument] })
  amenities: Types.Array<AmenityDocument>;

  @Prop({ type: PriceDocument })
  price: PriceDocument;

  @Prop()
  images: string[];

  @Prop()
  occupancy: number;
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomTypeDocument);
