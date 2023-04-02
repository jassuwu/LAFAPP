import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { User, Post as PostModel } from '@prisma/client';
import { LafService } from './laf.service';

@Controller('api/laf')
export class LafController {
  constructor(private readonly lafService: LafService) { }

  @Get()
  @ApiTags('laf')
  @ApiOperation({ summary: 'Get Hello' })
  @ApiResponse({ status: 200, description: 'Hello successfully retrieved' })
  getHello(): { error: boolean; status: string; message: string; health: string; } {
    return this.lafService.getHello();
  }

  @Get('user')
  @ApiTags('user')
  @ApiOperation({ summary: 'Get Users' })
  @ApiResponse({ status: 200, description: 'Users successfully retrieved' })
  getUsers(): Promise<User[]> {
    return this.lafService.getUsers();
  }

  @Get('user/:id')
  @ApiTags('user')
  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, description: 'User successfully retrieved' })
  getUser(@Param('id') id: string): Promise<User> {
    return this.lafService.getUser({ id });
  }

  @Post('user')
  @ApiTags('user')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  createUser(@Body() user: User): Promise<User> {
    return this.lafService.createUser(user);
  }

  @Patch('user/:id')
  @ApiTags('user')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 204, description: 'User successfully updated' })
  updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.lafService.updateUser({ id, user });
  }

  @Delete('user/:id')
  @ApiTags('user')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.lafService.removeUser({ id });
  }

  @Get('user/:id/posts')
  @ApiTags('user')
  @ApiOperation({ summary: 'Get User Posts' })
  @ApiResponse({ status: 200, description: 'Posts successfully retrieved' })
  async getUserPosts(@Param('id') id: string): Promise<User> {
    return this.lafService.getUserPosts({ id });
  }

  @Get('user/:id/postcount')
  @ApiTags('user')
  @ApiOperation({ summary: 'Get User Post Count' })
  @ApiResponse({ status: 200, description: 'Post count successfully retrieved' })
  async getUserPostCount(@Param('id') id: string): Promise<number> {
    return this.lafService.getUserPostCount(id);
  }

  @Get('user/:id/publishedpostcount')
  @ApiTags('user')
  @ApiOperation({ summary: 'Get User Published Post Count' })
  @ApiResponse({ status: 200, description: 'Published post count successfully retrieved' })
  async getUserPublishedPostCount(@Param('id') id: string): Promise<number> {
    return this.lafService.getUserPublishedPostCount(id);
  }

  @Get('post')
  @ApiTags('post')
  @ApiOperation({ summary: 'Get Posts' })
  @ApiResponse({ status: 200, description: 'Posts successfully retrieved' })
  async getPosts(): Promise<PostModel[]> {
    return this.lafService.getPosts();
  }

  @Get('post/unpublished')
  @ApiTags('post')
  @ApiOperation({ summary: 'Get Unpublished Posts' })
  @ApiResponse({ status: 200, description: 'Unpublished posts successfully retrieved' })
  async getUnpublishedPosts(): Promise<PostModel[]> {
    return this.lafService.getUnpublishedPosts();
  }

  @Get('post/:id')
  @ApiTags('post')
  @ApiOperation({ summary: 'Get Post' })
  @ApiResponse({ status: 200, description: 'Post successfully retrieved' })
  getPost(@Param('id') id: string): Promise<PostModel> {
    return this.lafService.getPost({ id });
  }

  @Post('post')
  @ApiTags('post')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
        published: {
          type: 'boolean',
          default: false,
        },
        authorId: {
          type: 'object',
          properties: {
            connect: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
              }
            },
          },
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create Post' })
  @ApiResponse({ status: 201, description: 'Post successfully created' })
  createPost(@Body() post: PostModel): Promise<PostModel> {
    return this.lafService.createPost(post);
  }


  @Patch('post/:id')
  @ApiTags('post')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
        published: {
          type: 'boolean',
          default: false,
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update Post' })
  @ApiResponse({ status: 204, description: 'Post successfully updated' })
  updatePost(@Param('id') id: string, @Body() post: PostModel): Promise<PostModel> {
    return this.lafService.updatePost({ id, post });
  }

  @Delete('post/:id')
  @ApiTags('post')
  @ApiOperation({ summary: 'Delete Post' })
  @ApiResponse({ status: 204, description: 'Post successfully deleted' })
  deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.lafService.removePost(id);
  }


  @Patch('post/:id/publish')
  @ApiTags('post')
  @ApiOperation({ summary: 'Publish Post' })
  @ApiResponse({ status: 204, description: 'Post successfully published' })
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.lafService.publishPost(id);
  }

  @Get('post/by/:authorId')
  @ApiTags('post')
  @ApiOperation({ summary: 'Get Posts by Author' })
  @ApiResponse({ status: 200, description: 'Posts successfully retrieved' })
  async getPostsByAuthor(@Param('authorId') authorId: string): Promise<PostModel[]> {
    return this.lafService.getPostsByAuthor(authorId);
  }

}
