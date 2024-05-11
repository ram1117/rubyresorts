import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullname: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  address: string;

  @Prop()
  mobile: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
