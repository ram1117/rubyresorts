import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReservationsDocument } from '@app/shared/models/reservations.model';
import { Types } from 'mongoose';

@Schema()
export class PaymentDocument extends AbstractDocument {
  @Prop()
  paymentIntent: string;

  @Prop({ type: Types.ObjectId, ref: ReservationsDocument.name })
  reservation: Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentDocument);
