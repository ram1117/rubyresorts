import { AbstractRepository } from '@app/shared';
import { PriceDocument } from './model/price.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PricingRepository extends AbstractRepository<PriceDocument> {
  constructor(
    @InjectModel(PriceDocument.name) priceModel: Model<PriceDocument>,
  ) {
    super(priceModel);
  }
}
