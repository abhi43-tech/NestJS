import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/render';
import * as nodemailer from 'nodemailer';

interface SendMailConfiguration {
  email: string;
  subject: string;
  text?: string;
  template: any;
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
      from: {
        name: 'NestJs + React Emails Test App',
        address: 'Test App',
      },
    });
  }

  private generateEmail = (template) => {
    return render(template);
  };

  async sendMail({ email, subject, template }: SendMailConfiguration) {
    const html = await this.generateEmail(template);

    this.transporter.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
