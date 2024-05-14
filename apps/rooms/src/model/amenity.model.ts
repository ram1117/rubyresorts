import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class AmenityDocument extends AbstractDocument {
  @Prop()
  amenity_code: number;

  @Prop()
  name: string;
}

export const AmenitySchema = SchemaFactory.createForClass(AmenityDocument);
