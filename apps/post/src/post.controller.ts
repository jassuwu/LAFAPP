import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma, Post as PostModel } from '@prisma/client';
import { PostService } from './post.service';

// @Controller('api/post')
// export class PostController {
//   constructor(private readonly postService: PostService) { }

//   @Post()
//   create(@Body() createPostDto: Prisma.PostCreateInput): Promise<PostModel> {
//     return this.postService.create(createPostDto);
//   }

//   @Get()
//   findAll(): Promise<PostModel[]> {
//     return this.postService.findAll({});
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<PostModel> {
//     return this.postService.findOne({
//       id,
//     });
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: Prisma.PostUpdateInput): Promise<PostModel> {
//     return this.postService.update({
//       where: {
//         id,
//       },
//       data: updatePostDto,
//     });
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postService.remove({
//       id,
//     });
//   }

// }

@Controller('api/post')
export class PostController {
  // MessagePattern controller
  constructor(private readonly postService: PostService) { }

  @MessagePattern({ cmd: 'createPost' })
  create(@Payload() data: { createPostDto: Prisma.PostCreateInput }): Promise<PostModel> {
    return this.postService.create(data.createPostDto);
  }

  @MessagePattern({ cmd: 'findAllPosts' })
  findAll(): Promise<PostModel[]> {
    return this.postService.findAll({});
  }

  @MessagePattern({ cmd: 'findOnePost' })
  findOne(@Payload('id') data: { id: string }): Promise<PostModel> {
    return this.postService.findOne({
      id: data.id,
    });
  }

  @MessagePattern({ cmd: 'updatePost' })
  update(@Payload('id') data: { id: string, updatePostDto: Prisma.PostUpdateInput }): Promise<PostModel> {
    return this.postService.update({
      where: {
        id: data.id,
      },
      data: data.updatePostDto,
    });
  }

  @MessagePattern({ cmd: 'removePost' })
  remove(@Payload('id') data: { id: string }): Promise<PostModel> {
    return this.postService.remove({
      id: data.id,
    });
  }
}