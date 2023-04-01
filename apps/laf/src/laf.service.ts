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


  getHello(): { error: boolean; status: string; message: string; health: string; } {
    return {
      error: false,
      status: 'OK',
      message: 'Welcome to the Lost and Found API',
      health: 'healthy',
    };
  }

  async getUsers(): Promise<User[]> {
    const observable = this.authClient.send({ cmd: 'findAllUsers' }, {});
    return await firstValueFrom(observable);
  }

  async getUser(data: { id: string }): Promise<User> {
    const observable = this.authClient.send({ cmd: 'findUser' }, data);
    return await firstValueFrom(observable);
  }

  async createUser(user: User): Promise<User> {
    const observable = this.authClient.send({ cmd: 'createUser' }, user);
    return await firstValueFrom(observable);
  }

  async updateUser(data: { id: string, user: User }): Promise<User> {
    const observable = this.authClient.send({ cmd: 'updateUser' }, data);
    return await firstValueFrom(observable);
  }

  async deleteUser(data: { id: string }): Promise<User> {
    const observable = this.authClient.send({ cmd: 'deleteUser' }, data);
    return await firstValueFrom(observable);
  }

  async getPosts(): Promise<Post[]> {
    const observable = this.postClient.send({ cmd: 'findAllPosts' }, {});
    return await firstValueFrom(observable);
  }

  async getPost(data: { id: string }): Promise<Post> {
    const observable = this.postClient.send({ cmd: 'findPost' }, data);
    return await firstValueFrom(observable);
  }

  async createPost(post: Post): Promise<Post> {
    const observable = this.postClient.send({ cmd: 'createPost' }, post);
    return await firstValueFrom(observable);
  }

  async updatePost(data: { id: string, post: Post }): Promise<Post> {
    const observable = this.postClient.send({ cmd: 'updatePost' }, data);
    return await firstValueFrom(observable);
  }

  async deletePost(data: { id: string }): Promise<Post> {
    const observable = this.postClient.send({ cmd: 'deletePost' }, data);
    return await firstValueFrom(observable);
  }

}
