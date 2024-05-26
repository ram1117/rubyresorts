import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Headers,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AppJwtAuthGuard } from '@app/shared/guards/appjwtauth.guard';
import RequestWithRawBody from './interface/requestwithrawbody.interface';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @UseGuards(AppJwtAuthGuard)
  @Get(':reservationid')
  getPaymentSecret(@Param('reservationid') reservationId: string) {
    return this.paymentsService.createIntent(reservationId);
  }

  @Post('webhook')
  handleHookEvent(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe signature header');
    }
    this.paymentsService.handleEvent(signature, request.rawBody);
    return { status: HttpStatus.OK };
  }
}
