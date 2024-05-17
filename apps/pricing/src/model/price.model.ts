import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class PriceDocument extends AbstractDocument {
  @Prop()
  baserate: number;

  @Prop()
  tax: number;

  @Prop()
  room_name: string;

  @Prop({ default: 0 })
  season_price: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ default: 0 })
  early_booking: number;

  @Prop({ default: 0 })
  late_booking: number;

  @Prop({ default: 0 })
  long_booking: number;
}

export const PriceSchema = SchemaFactory.createForClass(PriceDocument);
