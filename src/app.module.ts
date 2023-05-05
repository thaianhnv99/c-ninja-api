import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { BeltGuard } from './belt/belt.guard';
import { RequestService } from './request.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { NinjasModule } from './ninjas/ninjas.module';

@Module({
  imports: [
    NinjasModule,
    UsersModule,
    AuthModule,
    PrismaModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
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
