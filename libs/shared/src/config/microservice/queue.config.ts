import { Transport } from '@nestjs/microservices';

export enum QUEUE_NAMES {
  AUTH = 'auth_queue',
  PRICING = 'price_queue',
  PAYMENT = 'payment_queue',
  MAILER = 'mailer_queue',
}

export default function RabbitMQConfig() {
  return {
    authconfig: {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: QUEUE_NAMES.AUTH,
      },
    },
    pricingconfig: {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: QUEUE_NAMES.PRICING,
      },
    },
    paymentconfig: {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: QUEUE_NAMES.PAYMENT,
      },
    },
    mailerconfig: {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: QUEUE_NAMES.MAILER,
      },
    },
  };
}
