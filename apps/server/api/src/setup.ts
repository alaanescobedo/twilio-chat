import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as session from "express-session";

export function setup(app: INestApplication) {
  app.enableCors({
    origin: 'http://localhost:3000', //TODO: Add origin config
    allowedHeaders: [
      'Content-Type',
       'Accept', 
       'Access-Control-Allow-Origin',
      ],
    credentials: true
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    }),
  )
  app.setGlobalPrefix('api/v1');
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false
    }),
  );
}