import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma, Post as PostModel } from '@prisma/client';
import { PostService } from './post.service';

@Controller('api/post')
// MessagePattern controller
export class PostController {
  constructor(private readonly postService: PostService) { }

  @MessagePattern({ cmd: 'createPost' })
  create(@Payload() data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.postService.create(data);
  }

  @MessagePattern({ cmd: 'findAllPosts' })
  findAll(): Promise<PostModel[]> {
    return this.postService.findAll({});
  }

  @MessagePattern({ cmd: 'findOnePost' })
  findOne(@Payload() data: { id: string }): Promise<PostModel> {
    return this.postService.findOne({
      id: data.id,
    });
  }

  @MessagePattern({ cmd: 'updatePost' })
  update(@Payload() data: { id: string, post: Prisma.PostUpdateInput }): Promise<PostModel> {
    return this.postService.update({
      where: {
        id: data.id,
      },
      data: data.post,
    });
  }

  @MessagePattern({ cmd: 'removePost' })
  remove(@Payload() id: string): Promise<PostModel> {
    return this.postService.remove(
      {
        where: {
          id,
        }
      }
    );
  }
}