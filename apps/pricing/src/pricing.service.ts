import { Injectable, NotFoundException } from '@nestjs/common';
import { PricingRepository } from './pricing.repository';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { differenceInCalendarDays } from 'date-fns';

const seasonalMonths = [4, 5, 6, 7];

@Injectable()
export class PricingService {
  constructor(private readonly pricingRepo: PricingRepository) {}

  async getPrice(query: CheckAvailabilityDto) {
    const fromdate = new Date(query.fromdate);
    const todate = new Date(query.todate);

    const price_structure = (
      await this.pricingRepo.findRoomById(query.roomtype)
    )?.price;

    if (!price_structure) {
      throw new NotFoundException('Price data not found');
    }

    const no_of_days = differenceInCalendarDays(todate, fromdate);
    const isLongBooking = no_of_days > 10;
    const isLateBooking = differenceInCalendarDays(fromdate, new Date()) < 3;

    const isSeason = seasonalMonths.includes(fromdate.getMonth());

    let base_price = price_structure.baserate;
    if (isLongBooking) {
      base_price += base_price * price_structure.long_booking;
    }
    if (isSeason) {
      base_price += base_price * price_structure.season_price;
    }

    base_price = isLateBooking
      ? (base_price += base_price * price_structure.late_booking)
      : (base_price += base_price * price_structure.early_booking);

    const perday = Math.ceil(base_price);
    const perroom = perday * no_of_days;
    const grand = perroom * query.no_of_rooms;

    return { perday, perroom, grand, roomtype: query.roomtype };
  }
}
