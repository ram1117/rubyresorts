import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AppJwtAuthGuard } from '@app/shared/guards/appjwtauth.guard';
import { CurrentUser } from '@app/shared/decorators/current-user.decorator';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller()
@UseGuards(AppJwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  getReservations(@CurrentUser() user: any) {
    return this.reservationsService.findAllByUser(user._id);
  }

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: any,
  ) {
    return this.reservationsService.create(createReservationDto, user._id);
  }

  @Get('all')
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.reservationsService.update(id);
  }
}
