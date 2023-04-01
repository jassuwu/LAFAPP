import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get('user/:id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.lafService.getUser({ id });
  }

  @Post('user')
  createUser(@Body() user: User): Promise<User> {
    return this.lafService.createUser(user);
  }

  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.lafService.updateUser({ id, user });
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.lafService.removeUser({ id });
  }

  @Get('post')
  getPosts(): Promise<PostModel[]> {
    return this.lafService.getPosts();
  }

  @Get('post/:id')
  getPost(@Param('id') id: string): Promise<PostModel> {
    return this.lafService.getPost({ id });
  }

  @Post('post')
  createPost(@Body() post: PostModel): Promise<PostModel> {
    return this.lafService.createPost(post);
  }

  @Patch('post/:id')
  updatePost(@Param('id') id: string, @Body() post: PostModel): Promise<PostModel> {
    return this.lafService.updatePost({ id, post });
  }

  @Delete('post/:id')
  deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.lafService.removePost(id);
  }

}
