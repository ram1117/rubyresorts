import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class AmenityDocument {
  @Prop()
  amenity_code: number;

  @Prop()
  name: string;
}

export const AmenitySchema = SchemaFactory.createForClass(AmenityDocument);
