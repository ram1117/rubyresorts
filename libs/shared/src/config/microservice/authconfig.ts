import { Transport } from '@nestjs/microservices';
import { QUEUE_NAMES } from '@app/shared/constants';

const AuthMSConfig = () => ({
  authconfig: {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: QUEUE_NAMES.AUTH,
    },
  },
});

export default AuthMSConfig;
