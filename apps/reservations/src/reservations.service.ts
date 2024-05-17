import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsRepository } from './reservations.repoistory';
import { SERVICE_NAMES, SERVICE_PATTERNS } from '@app/shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Types } from 'mongoose';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepo: ReservationsRepository,
    @Inject(SERVICE_NAMES.PRICING) private pricingService: ClientProxy,
    @Inject(SERVICE_NAMES.PAYMENT) private paymentService: ClientProxy,
  ) {}

  findAvailability(createReservationDto: CreateReservationDto) {
    const availability = this.pricingService.send(
      { cmd: SERVICE_PATTERNS.PRICING },
      {
        fromdate: createReservationDto.fromdate,
        todate: createReservationDto.todate,
        no_of_rooms: createReservationDto.no_of_rooms,
        roomtype: createReservationDto.roomtype,
      },
    );
    return lastValueFrom(availability);
  }

  async create(createReservationDto: CreateReservationDto, userId: string) {
    createReservationDto.fromdate.setUTCHours(0, 0, 0, 0);

    const availability = await this.findAvailability(createReservationDto);

    if (!availability) {
      throw new UnprocessableEntityException(
        'Unable to book now. Please try again later',
      );
    }

    if (!availability.available) {
      throw new NotFoundException(
        'Not enough rooms available, please try different dates',
      );
    }

    const reservation = await this.reservationRepo.create({
      ...createReservationDto,
      user: new Types.ObjectId(userId),
      total_price: availability.grand,
      status: 'payment pending',
      roomtype: new Types.ObjectId(createReservationDto.roomtype),
    });

    if (!reservation) {
      throw new UnprocessableEntityException(
        'Reservation failed. Please try again later',
      );
    }

    this.pricingService.emit(
      { cmd: SERVICE_PATTERNS.INVENTORY },
      {
        status: 'create',
        rooms_count: createReservationDto.no_of_rooms,
        room_type: createReservationDto.roomtype,
        fromdate: createReservationDto.fromdate,
        todate: createReservationDto.todate,
      },
    );
    return reservation;
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

  async update(_id: string) {
    const reservation = await this.reservationRepo.findById(_id);
    if (reservation.status !== 'cancelled')
      this.pricingService.emit(
        { cmd: SERVICE_PATTERNS.INVENTORY },
        {
          status: 'cancel',
          rooms_count: reservation.no_of_rooms,
          room_type: reservation.roomtype,
          fromdate: reservation.fromdate,
          todate: reservation.todate,
        },
      );

    return this.reservationRepo.findAndUpdateById(_id, { status: 'cancelled' });
  }

  async updatePayment(data: UpdatePaymentDto) {
    const confirmation = await this.paymentService.send(
      { cmd: SERVICE_PATTERNS.PAYMENT },
      data,
    );
    console.log(await lastValueFrom(confirmation));
  }
}
