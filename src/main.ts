import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// const cookieSession = require('cookie-session'); // due to mismatch between nest configs and cookie-session library

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(cookieSession({
  //   keys: ['uDeiA2h34h3J2h9sK']
  // }));

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true // -> automatically removes the fields from the request bodies that are not specified in the DTO
  //   })
  // )

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

/*
  ENITRE FLOW - request -> DB
  1. Request -> Validation pipe: pipe uses DTO to validate body
  2. Validation pipe -> Controller: selects relavant info passed by pipe and defines the route
  3. Controller -> Service: takes the info from controller and defines an entity based on it
  4. Service -> Repository: takes entity and saves it to DB (its our interface to the SQLlite DB)
*/
