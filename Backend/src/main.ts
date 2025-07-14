// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // <-- Asegúrate de que esta sea la URL exacta de tu frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Si tu app usa cookies o headers de auth como tokens, habilita esto
  });
  await app.listen(3000);
}
bootstrap();