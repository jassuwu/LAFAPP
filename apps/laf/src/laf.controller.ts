import { Body, Controller, Get, Post } from '@nestjs/common';
import { User, Post as PostModel } from '@prisma/client';
import { LafService } from './laf.service';

@Controller('api/laf')
export class LafController {
  constructor(private readonly lafService: LafService) { }

  @Get()
  getHello(): string {
    return this.lafService.getHello();
  }

  @Get('user')
  getUsers(): Promise<User[]> {
    return this.lafService.getUsers();
  }

  @Get('post')
  getPosts(): Promise<PostModel[]> {
    return this.lafService.getPosts();
  }


}
