import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoomTypeDocument } from './model/room_type.model';
import { AbstractRepository } from '@app/shared';
import { InjectModel } from '@nestjs/mongoose';
import { RoomTypes } from './seeders/roomtype.data';

@Injectable()
export class RoomTypeRepository
  extends AbstractRepository<RoomTypeDocument>
  implements OnApplicationBootstrap
{
  constructor(
    @InjectModel(RoomTypeDocument.name)
    private roomsModel: Model<RoomTypeDocument>,
  ) {
    super(roomsModel);
  }
  onApplicationBootstrap() {
    this.roomsModel.deleteMany();
    RoomTypes.forEach((room) => {
      this.roomsModel.create(room);
    });
  }
}
