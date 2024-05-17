import { AbstractRepository } from '@app/shared';
import { PriceDocument } from './model/price.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { RoomTypeDocument } from 'apps/rooms/src/model/room_type.model';

@Injectable()
export class PricingRepository extends AbstractRepository<PriceDocument> {
  constructor(
    @InjectModel(PriceDocument.name) priceModel: Model<PriceDocument>,
    @InjectModel(RoomTypeDocument.name)
    readonly roomtypeModel: Model<RoomTypeDocument>,
  ) {
    super(priceModel);
  }

  async findRoomById(_id: string) {
    return await this.roomtypeModel.findById(_id);
  }
}
