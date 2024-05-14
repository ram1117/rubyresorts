import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AmenityDocument } from './amenity.model';
import { Types } from 'mongoose';
import { PriceDocument } from './price.model';
import { AbstractDocument } from '@app/shared';

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
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomTypeDocument);
