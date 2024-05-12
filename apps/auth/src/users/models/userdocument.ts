import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserDocument {
  @Prop()
  email: string;

  @Prop({ select: false })
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

// remove password from returned JSON objects

UserSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.password;
  },
});
