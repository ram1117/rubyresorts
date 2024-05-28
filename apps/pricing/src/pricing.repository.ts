import { AbstractRepository } from '@app/shared';
import { PriceDocument } from '../../../libs/shared/src/models/price.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { RoomTypeDocument } from '@app/shared/models/room_type.model';

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
