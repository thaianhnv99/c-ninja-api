import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthenticationMiddleware } from 'src/middleware/authentication.middleware';
import { RequestService } from 'src/request.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    RequestService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(UsersController); // For global
    // { path: '/path', method: RequestMethod.GET }
  }
}
