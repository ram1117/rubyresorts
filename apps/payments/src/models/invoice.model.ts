import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class InvoiceDocoment extends AbstractDocument {
  @Prop()
  payment_id: string;

  @Prop()
  total: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceDocoment);
