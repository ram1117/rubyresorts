import { Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class AbstractDocument {
  @Transform((value) => value.obj._id.toString())
  _id: Types.ObjectId;
}
