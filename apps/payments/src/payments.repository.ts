import { AbstractRepository } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InvoiceDocument } from './models/invoice.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsRepository extends AbstractRepository<InvoiceDocument> {
  constructor(
    @InjectModel(InvoiceDocument.name)
    readonly invoiceModel: Model<InvoiceDocument>,
  ) {
    super(invoiceModel);
  }
}
