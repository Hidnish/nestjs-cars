import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// import { User } from './users/user.entity';
// import { Report } from './reports/report.entity';
import { TypeOrmConfigService } from './config/typeorm.config';

const cookieSession = require('cookie-session'); // due to mismatch between nest configs and cookie-sessiosn library

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    UsersModule, 
    ReportsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ // whenever we create an instance of the module, apply the pipe to every req coming ot the app
        whitelist: true // -> automatically removes the fields from the request bodies that are not specified in the DTO
      })
    }
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) { // triggered when app starts listening to incoming traffic
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')]
        })
      )
      .forRoutes('*'); // -> apply middleware to every incoming req (global middleware)
  };
}

// TypeOrmModule.forRootAsync({ // this creates a database file: db.sqlite or test.sqlite (use forRoot() when there is no need to inject)
//   inject: [ConfigService], // necessary to allow access to ENV variables
//   useFactory: (config: ConfigService) => { // cannot pass ENV variables directly, need useFactory to pass them as argument
//     return {
//       type: 'sqlite',
//       database: config.get<string>('DB_NAME'),
//       synchronize: true, // Only DEV env: performs migrations automatically
//       entities: [User, Report]
//     }
//   }
// }),