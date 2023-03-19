import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLafDto } from './dto/create.dto';
import { LafService } from './laf.service';

@Controller('api/laf')
export class LafController {
  constructor(private readonly lafService: LafService) { }

  @Get()
  getHello(): string {
    return this.lafService.getHello();
  }

  @Post()
  create(@Body() createLafDto: CreateLafDto) {
    return this.lafService.create(createLafDto);
  }
}
