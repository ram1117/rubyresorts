import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/shared';
import { AmenityDocument } from './amenity.model';
import { Types } from 'mongoose';
import { PriceDocument } from './price.model';

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
