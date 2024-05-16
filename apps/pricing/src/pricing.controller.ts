import { Controller } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SERVICE_PATTERNS } from '@app/shared/constants';

@Controller()
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @MessagePattern({ cmd: SERVICE_PATTERNS.PRICING })
  getHello(@Payload() data: any) {
    console.log(data);
    return 1;
  }
}
