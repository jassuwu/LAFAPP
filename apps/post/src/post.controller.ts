import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma, Post as PostModel } from '@prisma/client';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create(@Body() createPostDto: Prisma.PostCreateInput): Promise<PostModel> {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostModel[]> {
    return this.postService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostModel> {
    return this.postService.findOne({
      id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: Prisma.PostUpdateInput): Promise<PostModel> {
    return this.postService.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove({
      id,
    });
  }

}
