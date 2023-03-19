import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({
      id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput): Promise<User> {
    return this.userService.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({
      id,
    });
  }
}
