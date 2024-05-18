import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { PaymentsRepository } from './payments.repository';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationsDocument } from 'apps/reservations/src/models/reservations.model';
import { Model } from 'mongoose';
import { RESERVATION_STATUS } from '@app/shared/constants';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepo: PaymentsRepository,
    @InjectModel(ReservationsDocument.name)
    private readonly reservationModel: Model<ReservationsDocument>,
  ) {}

  async create(data: CreateInvoiceDto) {
    const invoice = await this.paymentsRepo.create({
      total: data.total,
      payment_id: data.payment_id,
    });

    return this.reservationModel
      .findByIdAndUpdate(data.reservation_id, {
        invoice,
        status: RESERVATION_STATUS.RESERVE,
      })
      .populate('user', ['_id', 'email', 'fullname'])
      .lean<ReservationsDocument>(true);
  }
}
