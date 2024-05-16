import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsRepository } from './reservations.repoistory';
import { SERVICE_NAMES, SERVICE_PATTERNS } from '@app/shared/constants';
import { ClientProxy } from '@nestjs/microservices';
// import { map, pipe, tap } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepo: ReservationsRepository,
    @Inject(SERVICE_NAMES.PRICING) private pricingService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    createReservationDto.fromdate.setUTCHours(0, 0, 0, 0);

    const isAvailable = this.pricingService
      .send(
        { cmd: SERVICE_PATTERNS.PRICING },
        {
          fromdate: createReservationDto.fromdate,
          todate: createReservationDto.todate,
          no_of_rooms: createReservationDto.no_of_rooms,
        },
      )
      .pipe()
      .subscribe();

    console.log(isAvailable);

    // return this.reservationRepo.create({
    //   ...createReservationDto,
    //   user: userId,
    // });
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
