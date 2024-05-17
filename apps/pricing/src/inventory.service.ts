import { Injectable, NotFoundException } from '@nestjs/common';
import { InventryRepository } from './inventory.repository';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomTypeDocument } from 'apps/rooms/src/model/room_type.model';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';
import { differenceInCalendarDays } from 'date-fns';

@Injectable()
export class InventoryService {
  constructor(
    private readonly inventoryRepo: InventryRepository,
    @InjectModel(RoomTypeDocument.name)
    readonly roomtypeModel: Model<RoomTypeDocument>,
  ) {}

  async findMany(query: CheckAvailabilityDto) {
    const available_days = await this.inventoryRepo
      .findManyFilter({
        date: {
          $gte: query.fromdate,
          $lte: query.todate,
        },
        room_type: new Types.ObjectId(query.roomtype),
        available_rooms: { $gte: query.no_of_rooms },
      })
      .countDocuments();

    return (
      available_days >= differenceInCalendarDays(query.todate, query.fromdate)
    );
  }

  async updateMany(data: UpdateInventoryDto) {
    const room_inventory = await this.inventoryRepo.findManyByFilter({
      room_type: new Types.ObjectId(data.room_type),
      date: { $gte: data.fromdate, $lte: data.todate },
    });

    if (!room_inventory) {
      throw new NotFoundException('Document not found');
    }

    room_inventory.forEach(async (item) => {
      let available = item.available_rooms,
        booked = item.booked_rooms;

      if (data.status === 'create') {
        available -= data.rooms_count;
        booked += data.rooms_count;
      }

      if (data.status === 'cancel') {
        available += data.rooms_count;
        booked -= data.rooms_count;
      }

      await this.inventoryRepo.findAndUpdateById(item._id.toHexString(), {
        available_rooms: available,
        booked_rooms: booked,
      });
    });
  }
}
