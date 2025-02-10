import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}
  getHello(): string {
    return 'Hello World!';
  }

  public sendEmail() {
    this.mailService.sendMail({
      to: 'abhikotadiya4205@gmail.com',
      from: process.env.EMAIL_ID,
      subject: 'Hello',
      text: 'Hello from me',
      html: '<b>Hello</b>'
    })
    .then((done) => console.log(done))
    .catch((err) => console.log(err))
  }
}
