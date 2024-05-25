import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repoistory';

@Injectable()
export class PaymentsService {
  private readonly stripeClient = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    { apiVersion: '2024-04-10' },
  );

  constructor(
    private readonly paymentsRepo: PaymentsRepository,
    private readonly configService: ConfigService,
    private readonly reservationRepo: ReservationsRepository,
  ) {}

  async createIntent(reservationId: string) {
    const reservation = await this.reservationRepo.findById(reservationId);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    const savedIntent = await this.paymentsRepo.findOne({
      reservation: reservation._id.toString(),
    });

    if (!savedIntent) {
      const newIntent = await this.stripeClient.paymentIntents.create({
        amount: reservation.total_price * 100,
        confirm: true,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });

      await this.paymentsRepo.create({
        paymentIntent: newIntent.id,
        reservation: reservation._id,
      });

      return {
        secret: newIntent.client_secret,
        reservation: {
          _id: reservation._id.toString(),
          total: reservation.total_price,
        },
      };
    }

    const intent = await this.stripeClient.paymentIntents.retrieve(
      savedIntent.paymentIntent,
    );

    return {
      secret: intent.client_secret,
      reservation: {
        _id: reservation._id.toString(),
        total: reservation.total_price,
      },
    };
  }
}
