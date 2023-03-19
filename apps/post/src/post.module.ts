import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '../../../.env',
      }
    )
  ],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule { }
