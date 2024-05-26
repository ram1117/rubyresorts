import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class InvoiceDocument extends AbstractDocument {
  @Prop()
  payment_id: string;

  @Prop()
  total: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceDocument);
