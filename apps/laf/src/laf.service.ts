import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User, Post } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LafService {

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
  ) { }


  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(): Promise<User[]> {
    const observable = this.authClient.send({ cmd: 'findAllUsers' }, {});
    return await firstValueFrom(observable);
  }

  async getPosts(): Promise<Post[]> {
    const observable = this.postClient.send({ cmd: 'findAllPosts' }, {});
    return await firstValueFrom(observable);
  }

}
