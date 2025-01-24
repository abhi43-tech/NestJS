import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schemas';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './service/customer.service';


@Module({
  imports: [
        MongooseModule.forFeature([{name: 'customer', schema: CustomerSchema}])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}