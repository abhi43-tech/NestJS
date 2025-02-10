import { Injectable } from "@nestjs/common";

@Injectable()
export class RetrieveService {
  getHello() {
    return 'Hello'
  }
}