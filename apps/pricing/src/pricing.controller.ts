import { Controller } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SERVICE_PATTERNS } from '@app/shared/constants';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { InventoryService } from './inventory.service';

@Controller()
export class PricingController {
  constructor(
    private readonly pricingService: PricingService,
    private readonly inventoryService: InventoryService,
  ) {}

  @MessagePattern({ cmd: SERVICE_PATTERNS.PRICING })
  async checkAvailability(@Payload() payload: CheckAvailabilityDto) {
    const availableDates = await this.inventoryService.findMany(payload);
    return availableDates > 0;
  }
}
