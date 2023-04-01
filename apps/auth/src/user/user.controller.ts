import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('api/user')
// MessagePattern controller
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'findAllUsers' })
  findAll(): Promise<User[]> {
    return this.userService.findAll({});
  }

  @MessagePattern({ cmd: 'findOneUser' })
  findOne(@Payload() data: { id: string }): Promise<User> {
    return this.userService.findOne({
      id: data.id,
    });
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() data: { id: string, user: Prisma.UserUpdateInput }): Promise<User> {
    return this.userService.update({
      where: {
        id: data.id,
      },
      data: data.user,
    });
  }

  @MessagePattern({ cmd: 'removeUser' })
  remove(@Payload() id: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.userService.remove(
      {
        where: id,
      }
    );
  }
}