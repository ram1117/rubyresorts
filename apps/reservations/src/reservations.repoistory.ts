import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationsDocument } from './models/reservations.model';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/shared';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsDocument> {
  constructor(
    @InjectModel(ReservationsDocument.name)
    readonly reservationsModel: Model<ReservationsDocument>,
  ) {
    super(reservationsModel);
  }

  async findAllByUserPopulated(userId: string) {
    return await this.reservationsModel
      .find({ user: userId })
      .lean<ReservationsDocument>(true)
      .populate('roomtype', ['_id', 'name']);
  }

  async findAllPopulated() {
    return await this.reservationsModel
      .find()
      .lean<ReservationsDocument>(true)
      .populate('roomtype', ['_id', 'name'])
      .populate('user', ['_id', 'fullname']);
  }
}
