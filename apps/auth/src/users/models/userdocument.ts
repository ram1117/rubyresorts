import { AbstractDocument } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ unique: true })
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

  @Prop({ default: '' })
  hashedRT: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

// remove password from returned JSON objects

UserSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.password;
  },
});
