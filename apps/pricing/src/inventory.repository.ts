import { AbstractRepository } from '@app/shared';
import { RoomInventoryDocument } from '../../../libs/shared/src/models/room_inventory.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventryRepository extends AbstractRepository<RoomInventoryDocument> {
  constructor(
    @InjectModel(RoomInventoryDocument.name)
    readonly inventoryModel: Model<RoomInventoryDocument>,
  ) {
    super(inventoryModel);
  }

  findManyFilter(filterQuery: any) {
    return this.inventoryModel
      .find(filterQuery)
      .lean<RoomInventoryDocument[]>(true);
  }
}
