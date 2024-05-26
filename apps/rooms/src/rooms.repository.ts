import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoomTypeDocument } from './model/room_type.model';
import { AbstractRepository } from '@app/shared';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomTypeRepository extends AbstractRepository<RoomTypeDocument> {
  constructor(
    @InjectModel(RoomTypeDocument.name)
    readonly roomsModel: Model<RoomTypeDocument>,
  ) {
    super(roomsModel);
  }

  async findBySelect(sortBy: any) {
    return await this.roomsModel
      .find({}, { _id: 1, name: 1, images: 1, occupancy: 1 })
      .sort(sortBy)
      .lean<RoomTypeDocument>(true);
  }
}
