import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Your API Documentation')
    .setDescription('API description and endpoints')
    .setVersion('1.0')
    .addBearerAuth() // Remove if not using authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Access Swagger UI at /api

  await app.listen(3000);
}
bootstrap();
