import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // seteamos el prefijo de forma global, esto generara la ruta por ejemplo
  // http://localhost:3000/api/v2/pokemon
  // antepone api/v2/ a la ruta de los controladores
  app.setGlobalPrefix('api/v2');

  // Para usar propiedades globales antes debemos instalar --> yarn add class-validator class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(3000);
}
bootstrap();
