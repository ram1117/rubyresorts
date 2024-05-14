import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

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
