import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsRepository } from './reservations.repoistory';
import {
  MAIL_TYPE,
  RESERVATION_STATUS,
  SERVICE_NAMES,
  SERVICE_PATTERNS,
} from '@app/shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Types } from 'mongoose';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepo: ReservationsRepository,
    private readonly configService: ConfigService,
    @Inject(SERVICE_NAMES.PRICING) private pricingService: ClientProxy,
    @Inject(SERVICE_NAMES.PAYMENT) private paymentService: ClientProxy,
    @Inject(SERVICE_NAMES.MAILER) private mailerService: ClientProxy,
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
      status: RESERVATION_STATUS.PENDING,
      roomtype: new Types.ObjectId(createReservationDto.roomtype),
      invoice: null,
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
    const reservation = await this.reservationRepo.findOnePopulated(_id);
    if (reservation.status !== RESERVATION_STATUS.CANCEL)
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

    const updatedReservation = await this.reservationRepo.findAndUpdateById(
      _id,
      {
        status: RESERVATION_STATUS.CANCEL,
      },
    );
    this.mailerService.emit(
      { cmd: SERVICE_PATTERNS.MAIL },
      {
        template: MAIL_TYPE.CANCEL,
        user: reservation.user,
        link: `${this.configService.get('CLIENT_URL')}/reservations/${reservation._id}`,
      },
    );

    return updatedReservation;
  }

  async updatePayment(data: UpdatePaymentDto) {
    const paymentResponse = this.paymentService.send(
      { cmd: SERVICE_PATTERNS.PAYMENT },
      data,
    );
    const reservation = await lastValueFrom(paymentResponse);
    if (!reservation) {
      throw new UnprocessableEntityException(
        'Unable to complete payment.Please contact customer support',
      );
    }
    this.mailerService.emit(
      { cmd: SERVICE_PATTERNS.MAIL },
      {
        template: MAIL_TYPE.CONFIRMATION,
        user: reservation.user,
        link: `${this.configService.get('CLIENT_URL')}/reservations/${reservation._id}`,
      },
    );
    return reservation;
  }
}
