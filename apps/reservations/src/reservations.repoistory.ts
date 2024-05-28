import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationsDocument } from '../../../libs/shared/src/models/reservations.model';
import { Model, Types } from 'mongoose';
import { AbstractRepository } from '@app/shared';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsDocument> {
  constructor(
    @InjectModel(ReservationsDocument.name)
    readonly reservationsModel: Model<ReservationsDocument>,
  ) {
    super(reservationsModel);
  }

  async findOnePopulated(id: string) {
    return await this.reservationsModel
      .findById(id)
      .lean<ReservationsDocument>(true)
      .populate('user', ['_id', 'fullname', 'email'])
      .populate('roomtype', ['_id', 'name']);
  }

  async findAllByUserPopulated(userId: string) {
    return await this.reservationsModel
      .find({ user: new Types.ObjectId(userId) })
      .lean<ReservationsDocument>(true)
      .populate('roomtype', ['_id', 'name']);
  }

  async findAllPopulated() {
    return await this.reservationsModel
      .find()
      .lean<ReservationsDocument>(true)
      .populate('roomtype', ['_id', 'name'])
      .populate('user', ['_id', 'fullname', 'email']);
  }
}
