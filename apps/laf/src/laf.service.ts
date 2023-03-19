import { Injectable } from '@nestjs/common';

@Injectable()
export class LafService {
  getHello(): string {
    return 'Hello World!';
  }
}
