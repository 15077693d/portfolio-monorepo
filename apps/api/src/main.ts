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

  // Configure CORS with whitelist
  const whitelist = process.env.CLIENT_URLS?.split(',') || [
    'http://localhost:3000',
    'https://your-production-domain.com',
  ];

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

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
