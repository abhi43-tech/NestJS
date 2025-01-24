import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task-module/task-module';
import { DatebaseModule } from './database/database.module';
import { CustomerModule } from './customer/customer.module';
import { LoggerMiddleware } from './core/middleware';
import { CustomerController } from './customer/controller/customer.controller';


@Module({
  imports: [TaskModule, DatebaseModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CustomerController);
  }
}
