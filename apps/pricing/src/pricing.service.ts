import { Injectable } from '@nestjs/common';
import { PricingRepository } from './pricing.repository';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';

@Injectable()
export class PricingService {
  constructor(private readonly pricingRepo: PricingRepository) {}

  async getPrice(data: CheckAvailabilityDto) {
    console.log(data);
  }
}
