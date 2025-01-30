import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private readonly configService: ConfigService) {
    console.log(this.configService.get<Number>('port'))
  }

  getHello(): string {
    return 'Hello World!';
  }
}
