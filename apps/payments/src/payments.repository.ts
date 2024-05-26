import { AbstractRepository } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaymentDocument } from './models/payment.model';

@Injectable()
export class PaymentsRepository extends AbstractRepository<PaymentDocument> {
  constructor(
    @InjectModel(PaymentDocument.name)
    readonly paymentModel: Model<PaymentDocument>,
  ) {
    super(paymentModel);
  }

  async findOnePopulated(
    filterQuery: FilterQuery<PaymentDocument>,
  ): Promise<PaymentDocument> {
    return await this.paymentModel
      .find(filterQuery)
      .lean<PaymentDocument>(true)
      .populate('reservation', ['_id', 'total_price']);
  }
}
