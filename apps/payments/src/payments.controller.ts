import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SERVICE_PATTERNS } from '@app/shared/constants';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern({ cmd: SERVICE_PATTERNS.PAYMENT })
  createInvoice(@Payload() payload: CreateInvoiceDto) {
    return this.paymentsService.create(payload);
  }
}
