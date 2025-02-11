
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";


@Module({
  exports: [MailService],
})
export class MailModule {}