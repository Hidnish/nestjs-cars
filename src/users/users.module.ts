import { Module, MiddlewareConsumer } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Creates User repository
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    // {
    //   provide: APP_INTERCEPTOR, // sets up a globally scoped interceptor that gets called on every request, !!REMEBER!! only runs after middlewares and guards
    //   useClass: CurrentUserInterceptor
    // }
  ],
})

export class UsersModule {
  configure(consumer: MiddlewareConsumer) { // use middleware instead of the interceptor, since we want it to run before the AdminGuard
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
