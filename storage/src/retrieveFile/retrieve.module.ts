import { Module } from '@nestjs/common';
import { RetrieveService } from './retrieve.service';
import { RetrieveController } from './retrieve.controller';

@Module({
  providers: [RetrieveService],
  controllers: [RetrieveController]
})
export class RetrieveModule {}
