import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoomTypeDocument } from 'apps/rooms/src/model/room_type.model';
import { Types } from 'mongoose';
import { AbstractDocument } from '@app/shared';

@Schema({ versionKey: false })
export class RoomInventoryDocument extends AbstractDocument {
  @Prop()
  date: Date;

  @Prop()
  available_rooms: number;

  @Prop({ default: 0 })
  booked_rooms: number;

  @Prop({ type: Types.ObjectId, ref: RoomTypeDocument.name })
  room_type: RoomTypeDocument;
}

export const RoomInventorySchema = SchemaFactory.createForClass(
  RoomInventoryDocument,
);
