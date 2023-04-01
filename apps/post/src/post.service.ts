import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from '@app/common';
@Injectable()
export class PostService {

  constructor(private prisma: PrismaService) { }

  async create(createPostDto: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PostWhereUniqueInput;
      where?: Prisma.PostWhereInput;
      orderBy?: Prisma.PostOrderByWithRelationInput;
    }
  ) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: id,
    });
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });

  }

  async remove(params: {
    where: Prisma.PostWhereUniqueInput,
  }): Promise<Post> {
    const { where } = params;
    return this.prisma.post.delete({
      where,
    });
  }
}