import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class PriceDocument {
  @Prop()
  baserate: number;

  @Prop()
  tax: number;

  @Prop()
  room_name: string;
}

export const PriceSchema = SchemaFactory.createForClass(PriceDocument);
