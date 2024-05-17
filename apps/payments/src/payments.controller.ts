import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SERVICE_PATTERNS } from '@app/shared/constants';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern({ cmd: SERVICE_PATTERNS.PAYMENT })
  getHello(@Payload() payload: any): string {
    console.log(payload);
    return this.paymentsService.getHello();
  }
}
