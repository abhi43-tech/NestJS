import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
