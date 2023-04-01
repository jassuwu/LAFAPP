import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, Post as PostModel } from '@prisma/client';
import { LafService } from './laf.service';

@ApiTags('laf')
@Controller('api/laf')
export class LafController {
  constructor(private readonly lafService: LafService) { }

  @Get()
  getHello(): { error: boolean; status: string; message: string; health: string; } {
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

  @Post('post')
  createPost(@Body() post: PostModel): Promise<PostModel> {
    return this.lafService.createPost(post);
  }



}
