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

  @MessagePattern({ cmd: 'getUserPostCount' })
  async getUserPostCount(@Payload() id: string): Promise<number> {
    return this.postService.getUserPostCount(
      {
        where: {
          authorId: id,
        },
      }
    )
  }

  @MessagePattern({ cmd: 'getUserPublishedPostCount' })
  async getUserPublishedPostCount(@Payload() id: string): Promise<number> {
    return this.postService.getUserPublishedPostCount(
      {
        where: {
          authorId: id,
          published: true,
        },
      }
    )
  }

  @MessagePattern({ cmd: 'getUnpublishedPosts' })
  async getUnpublishedPosts(): Promise<PostModel[]> {
    return this.postService.getUnpublishedPosts(
      {
        where: {
          published: false,
        },
      }
    )
  }

  @MessagePattern({ cmd: 'publishPost' })
  async publishPost(@Payload() id: string): Promise<PostModel> {
    return this.postService.publishPost(
      {
        where: {
          id,
        },
      }
    )
  }


  @MessagePattern({ cmd: 'getPostsByAuthor' })
  async getPostsByAuthor(@Payload() id: string): Promise<PostModel[]> {
    return this.postService.getPostsByAuthor(
      {
        where: {
          authorId: id,
        },
      }
    )
  }

}