import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

// @Controller('api/user')
// export class UserController {
//   constructor(private readonly userService: UserService) { }

//   @Post()
//   create(@Body() createUserDto: Prisma.UserCreateInput): Promise<User> {
//     return this.userService.create(createUserDto);
//   }

//   @Get()
//   findAll(): Promise<User[]> {
//     return this.userService.findAll({});
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<User> {
//     return this.userService.findOne({
//       id,
//     });
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput): Promise<User> {
//     return this.userService.update({
//       where: {
//         id,
//       },
//       data: updateUserDto,
//     });
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userService.remove({
//       id,
//     });
//   }
// }


@Controller('api/user')
export class UserController {
  // MessagePattern controller
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() data: { createUserDto: Prisma.UserCreateInput }): Promise<User> {
    return this.userService.create(data.createUserDto);
  }

  @MessagePattern({ cmd: 'findAllUsers' })
  findAll(): Promise<User[]> {
    return this.userService.findAll({});
  }

  @MessagePattern({ cmd: 'findOneUser' })
  findOne(@Payload('id') data: { id: string }): Promise<User> {
    return this.userService.findOne({
      id: data.id,
    });
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload('id') data: { id: string, updateUserDto: Prisma.UserUpdateInput }): Promise<User> {
    return this.userService.update({
      where: {
        id: data.id,
      },
      data: data.updateUserDto,
    });
  }

  @MessagePattern({ cmd: 'removeUser' })
  remove(@Payload('id') data: { id: string }): Promise<User> {
    return this.userService.remove({
      id: data.id,
    });
  }
}