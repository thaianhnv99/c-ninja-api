import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { UsersModule } from './users/users.module';
import { NinjasController } from './ninjas/ninjas.controller';
import { NinjasService } from './ninjas/ninjas.service';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { BeltGuard } from './belt/belt.guard';
import { RequestService } from './request.service';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    NinjasModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    BookmarkModule,
  ],
  controllers: [AppController, NinjasController],
  providers: [
    AppService,
    NinjasService,
    RequestService,
    UsersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: BeltGuard,
    },
  ],
})
export class AppModule {}
