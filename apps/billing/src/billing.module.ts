import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, RabbitmqModule } from 'libs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import * as Joi from 'joi';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      RABBIT_MQ_URI: Joi.string().required(),
      RABBIT_MQ_BILLING_QUEUE: Joi.string().required()
    })
  }), 
  RabbitmqModule,
  AuthModule],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
