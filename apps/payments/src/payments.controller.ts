import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
// import { MessagePattern, Payload } from '@nestjs/microservices';
// import { SERVICE_PATTERNS } from '@app/shared/constants';
// import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { AppJwtAuthGuard } from '@app/shared/guards/appjwtauth.guard';

@UseGuards(AppJwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':reservationid')
  getPaymentSecret(@Param('reservationid') reservationId: string) {
    console.log(reservationId);
    return this.paymentsService.createIntent(reservationId);
  }

  // @MessagePattern({ cmd: SERVICE_PATTERNS.PAYMENT })
  // createInvoice(@Payload() payload: CreateInvoiceDto) {
  //   return this.paymentsService.create(payload);
  // }
}
