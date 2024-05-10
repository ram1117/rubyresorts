import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoomTypeDocument } from './model/room_type.model';
import { AbstractRepository } from '@app/shared';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomTypeRepository extends AbstractRepository<RoomTypeDocument> {
  constructor(
    @InjectModel(RoomTypeDocument.name)
    roomsModel: Model<RoomTypeDocument>,
  ) {
    super(roomsModel);
  }
}
