import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { UsersModule } from './users/users.module';
import { NinjasController } from './ninjas/ninjas.controller';
import { NinjasService } from './ninjas/ninjas.service';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { BeltGuard } from './belt/belt.guard';

@Module({
  imports: [NinjasModule, UsersModule],
  controllers: [AppController, NinjasController],
  providers: [
    AppService,
    NinjasService,
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
