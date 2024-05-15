import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationsDocument } from './models/reservations.model';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/shared';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsDocument> {
  constructor(
    @InjectModel(ReservationsDocument.name)
    reservationsModel: Model<ReservationsDocument>,
  ) {
    super(reservationsModel);
  }
}
