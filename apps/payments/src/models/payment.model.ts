import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReservationsDocument } from 'apps/reservations/src/models/reservations.model';
import { Types } from 'mongoose';

@Schema()
export class PaymentDocument extends AbstractDocument {
  @Prop()
  paymentIntent: string;

  @Prop({ type: Types.ObjectId, ref: ReservationsDocument.name })
  reservation: Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentDocument);
