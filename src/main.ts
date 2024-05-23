import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // -> automatically removes the fields from the request bodies that are not specified in the DTO
    })
  )
  await app.listen(3000);
}
bootstrap();
