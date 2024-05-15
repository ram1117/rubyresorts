import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from 'apps/auth/src/users/models/userdocument';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
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

  @Prop({ type: Types.ObjectId, ref: 'UserDocument' })
  user: UserDocument;
}

export const ReservationsSchema =
  SchemaFactory.createForClass(ReservationsDocument);
