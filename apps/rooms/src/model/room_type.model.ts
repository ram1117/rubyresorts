import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/shared';

@Schema({ versionKey: false })
export class RoomTypeDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  total: number;
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomTypeDocument);
