import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.port || 5000;
  await app.listen(port, () => console.log(`server started on: ${ port }`));
}
bootstrap();
