import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsRepository } from './reservations.repoistory';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepo: ReservationsRepository) {}

  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationRepo.create({
      ...createReservationDto,
      user: userId,
    });
  }

  findAllByUser(userId: string) {
    return this.reservationRepo.findAllByUserPopulated(userId);
  }

  findAll() {
    return this.reservationRepo.findAllPopulated();
  }

  findOne(_id: string) {
    return this.reservationRepo.findById(_id);
  }

  update(_id: string) {
    return this.reservationRepo.findAndUpdateById(_id, { status: 'cancelled' });
  }
}
