import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { RabbitMqService } from 'libs/common';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const rmqService = app.get<RabbitMqService>(RabbitMqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
