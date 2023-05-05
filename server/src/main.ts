import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(
      AppModule,
      { cors: true });
  const port = process.env.port || 5000;

  app.use(cookieParser())

  await app.listen(port, () => console.log(`server started on: ${ port }`));
}
bootstrap();
