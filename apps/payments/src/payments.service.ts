import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { ReservationsRepository } from 'apps/reservations/src/reservations.repoistory';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

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
      reservation: reservation._id,
    });

    if (!savedIntent) {
      const newIntent = await this.stripeClient.paymentIntents.create({
        description: 'Resort Reservation',
        shipping: {
          name: 'John Doe',
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'San Francisco',
            state: 'CA',
            country: 'US',
          },
        },
        amount: reservation.total_price * 100,
        confirm: true,
        currency: 'usd',
        payment_method: 'pm_card_visa',
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

  async handleEvent(signature: string, payload: Buffer) {
    const hookSecret = this.configService.getOrThrow('STRIPE_WEBHOOK_SECRET');

    const event = this.stripeClient.webhooks.constructEvent(
      payload,
      signature,
      hookSecret,
    );

    if (!event) {
      this.logger.error('Error constructing event from webhook');
    }

    if ((event.type = 'payment_intent.succeeded')) {
      const data = event.data.object as Stripe.PaymentIntent;
      const { id, status } = data;
      if (status === 'succeeded') {
        const reservation = await this.paymentsRepo.findOne({
          paymentIntent: id,
        });
        if (!reservation) {
          this.logger.error('Reservation not found');
        }
        this.reservationRepo.findAndUpdateById(
          reservation.reservation._id.toString(),
          { status: 'Confirmed' },
        );
      }
    }
  }
}
