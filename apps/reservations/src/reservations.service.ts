import { Inject, Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repoistory';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@app/shared/constants';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepo: ReservationsRepository,
    @Inject(SERVICE_NAMES.AUTH) private authService: ClientProxy,
  ) {}

  async findManyById() {
    const result = await this.authService.send(
      { cmd: 'authenticate_user' },
      { message: 'handshake' },
    );

    result.pipe().forEach((value) => {
      console.log(value);
    });
  }
}
