import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Creates User repository
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    {
      provide: APP_INTERCEPTOR, // sets up a globally scoped interceptor that gets called on every request
      useClass: CurrentUserInterceptor
    }
  ],
})

export class UsersModule {}
