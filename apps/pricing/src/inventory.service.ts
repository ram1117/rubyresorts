import { Injectable } from '@nestjs/common';
import { InventryRepository } from './inventory.repository';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomTypeDocument } from 'apps/rooms/src/model/room_type.model';

@Injectable()
export class InventoryService {
  constructor(
    private readonly inventoryRepo: InventryRepository,
    @InjectModel(RoomTypeDocument.name)
    readonly roomtypeModel: Model<RoomTypeDocument>,
  ) {}

  async findMany(query: CheckAvailabilityDto) {
    return this.inventoryRepo
      .findManyFilter({
        date: {
          $gte: query.fromdate,
          $lte: query.todate,
        },
        room_type: new Types.ObjectId(query.roomtype),
        available_rooms: { $gt: 0 },
      })
      .countDocuments();
  }
}
