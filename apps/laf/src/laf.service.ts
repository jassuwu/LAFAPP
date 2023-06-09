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
    const observable = this.authClient.send({ cmd: 'findOneUser' }, data);
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

  async removeUser(data: { id: string }): Promise<User> {
    const observable = this.authClient.send({ cmd: 'removeUser' }, data);
    return await firstValueFrom(observable);
  }

  async getUserPosts(data: { id: string }): Promise<User> {
    const observable = this.authClient.send({ cmd: 'getUserPosts' }, data);
    return await firstValueFrom(observable);
  }

  async getUserPostCount(id: string): Promise<number> {
    const observable = this.postClient.send({ cmd: 'getUserPostCount' }, id);
    return await firstValueFrom(observable);
  }

  async getUserPublishedPostCount(id: string): Promise<number> {
    const observable = this.postClient.send({ cmd: 'getUserPublishedPostCount' }, id);
    return await firstValueFrom(observable);
  }

  async getPosts(): Promise<Post[]> {
    const observable = this.postClient.send({ cmd: 'findAllPosts' }, {});
    return await firstValueFrom(observable);
  }

  async getPost(data: { id: string }): Promise<Post> {
    const observable = this.postClient.send({ cmd: 'findOnePost' }, data);
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

  async removePost(id: string): Promise<Post> {
    const observable = this.postClient.send({ cmd: 'removePost' }, id);
    return await firstValueFrom(observable);
  }

  async getUnpublishedPosts(): Promise<Post[]> {
    const observable = this.postClient.send({ cmd: 'getUnpublishedPosts' }, {});
    return await firstValueFrom(observable);
  }

  async publishPost(id: string): Promise<Post> {
    const observable = this.postClient.send({ cmd: 'publishPost' }, id);
    return await firstValueFrom(observable);
  }

  async getPostsByAuthor(id: string): Promise<Post[]> {
    const observable = this.postClient.send({ cmd: 'getPostsByAuthor' }, id);
    return await firstValueFrom(observable);
  }

}
