import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repoistory';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepo: ReservationsRepository) {}

  findManyById() {
    return this.reservationsRepo.findMany();
  }
}
