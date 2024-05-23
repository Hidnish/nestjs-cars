import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // -> this creates a database file: db.sqlite
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report], // add entities here
      synchronize: true // -> Only DEV env: performs migrations automatically
    }), 
    UsersModule, 
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
