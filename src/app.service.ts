import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   *
   */
  constructor() {
    //console.log('Hello');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
