import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from '@app/shared/models/userdocument';
import { RoomTypeDocument } from './room_type.model';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ReservationsDocument extends AbstractDocument {
  @Prop()
  fromdate: Date;

  @Prop()
  todate: Date;

  @Prop()
  no_of_rooms: number;

  @Prop()
  guest_count: number;

  @Prop({ default: 'booked' })
  status: string;

  @Prop({ default: 0.0 })
  total_price: number;

  @Prop({ type: Types.ObjectId, ref: UserDocument.name })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: RoomTypeDocument.name })
  roomtype: Types.ObjectId;
}

export const ReservationsSchema =
  SchemaFactory.createForClass(ReservationsDocument);
