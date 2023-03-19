import { Injectable } from '@nestjs/common';

@Injectable()
export class LafService {
  getHello(): string {
    return 'Hello World!';
  }


  create(createLafDto) {
    return 'This action adds a new laf, with name: ' + createLafDto.name + ', age: ' + createLafDto.age + ', breed: ' + createLafDto.breed + '';
  }


}
