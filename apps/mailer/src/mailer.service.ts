import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import handlebars from 'handlebars';
import { MAIL_TYPE } from '@app/shared/constants';

enum MAIL_SUBJECT {
  CONFIRMATION = 'Ruby Resorts - Your reservation is successful',
  RESET = 'Ruby Resorts - Password Reset',
  VERIFY = 'Ruby Resorts - Verify your account',
  CANCEL = 'Ruby Resorts - Your reservation is cancelled',
}

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  constructor(private readonly configService: ConfigService) {}

  mailTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('SMTP_USER'),
        clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
        clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
        refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
      },
    });
  }

  generateTemplate(data: any) {
    const templateFile = readFileSync(
      join(__dirname, 'templates', data.template),
      'utf-8',
    );
    const template = handlebars.compile(templateFile);
    const html = template({ name: data.user.fullname, link: data.link });
    return html;
  }

  async sendEmail(data: any) {
    const transporter = this.mailTransporter();
    let subject: string;

    switch (data.template) {
      case MAIL_TYPE.CANCEL:
        subject = MAIL_SUBJECT.CANCEL;
        break;
      case MAIL_TYPE.RESET:
        subject = MAIL_SUBJECT.RESET;
        break;
      case MAIL_TYPE.VERIFY:
        subject = MAIL_SUBJECT.VERIFY;
        break;
      default:
        subject = MAIL_SUBJECT.CONFIRMATION;
        break;
    }

    await transporter
      .sendMail({
        to: data.user.email,
        subject,
        html: this.generateTemplate(data),
      })
      .catch((err) => this.logger.error(err));
  }
}
