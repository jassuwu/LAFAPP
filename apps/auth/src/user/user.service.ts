import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@app/common';
@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    }
  ) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: id,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });

  }

  async remove(params: {
    where: Prisma.UserWhereUniqueInput,
  }): Promise<User> {
    const { where } = params;
    return this.prisma.user.delete({
      where,
    });
  }
}