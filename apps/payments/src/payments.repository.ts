import { AbstractRepository } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InvoiceDocoment } from './models/invoice.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsRepository extends AbstractRepository<InvoiceDocoment> {
  constructor(
    @InjectModel(InvoiceDocoment.name)
    readonly invoiceModel: Model<InvoiceDocoment>,
  ) {
    super(invoiceModel);
  }
}
