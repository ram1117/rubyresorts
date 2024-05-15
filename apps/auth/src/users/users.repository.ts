import { AbstractRepository } from '@app/shared';
import { UserDocument } from './models/userdocument';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
