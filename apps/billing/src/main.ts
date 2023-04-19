import { NestFactory } from '@nestjs/core';
import { RabbitMqService } from 'libs/common';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);

  const rmqService = app.get<RabbitMqService>(RabbitMqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'))

  await app.startAllMicroservices();
}
bootstrap();
