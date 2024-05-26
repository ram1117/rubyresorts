import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SERVICE_PATTERNS } from '@app/shared/constants';
import { PayloadDto } from './dtos/payload.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern({ cmd: SERVICE_PATTERNS.MAIL })
  sendConfirmation(@Payload() data: PayloadDto) {
    this.mailerService.sendEmail(data);
  }
}
