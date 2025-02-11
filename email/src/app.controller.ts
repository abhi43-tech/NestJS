import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { SendMailDto } from './mail/mail.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-email')
  async sendMail(@Body() sendMailDto: SendMailDto): Promise<string> {
    await this.mailService.sendMail({...sendMailDto, template: '<b>Hello</b>'})    

    return 'Email sent successfully';
  }
}
