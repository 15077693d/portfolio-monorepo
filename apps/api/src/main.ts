import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
  console.log('🚀 ~ bootstrap ~ process.env:', process.env);

  // Configure CORS with whitelist
  const whitelist = process.env.CLIENT_URLS?.split(',') || [];
  console.log(
    '🚀 ~ bootstrap ~ whitelist:',
    whitelist,
    process.env.CLIENT_URLS?.split(','),
    process.env.CLIENT_URLS,
  );
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3000);
}
void bootstrap();
