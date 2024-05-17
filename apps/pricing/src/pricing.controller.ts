import { Controller } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { SERVICE_PATTERNS } from '@app/shared/constants';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';

@Controller()
export class PricingController {
  constructor(
    private readonly pricingService: PricingService,
    private readonly inventoryService: InventoryService,
  ) {}

  @MessagePattern({ cmd: SERVICE_PATTERNS.PRICING })
  async checkAvailability(@Payload() payload: CheckAvailabilityDto) {
    const available = await this.inventoryService.findMany(payload);
    const prices = await this.pricingService.getPrice(payload);
    return { available, prices };
  }

  @EventPattern({ cmd: SERVICE_PATTERNS.INVENTORY })
  updateInventory(@Payload() payload: UpdateInventoryDto) {
    this.inventoryService.updateMany(payload);
  }
}
