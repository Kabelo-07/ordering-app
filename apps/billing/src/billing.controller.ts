import { Controller, Get, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import {EventPattern, RmqContext, Payload, Ctx} from '@nestjs/microservices';
import { JwtAuthGuard, RabbitMqService } from 'libs/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService, 
    private readonly rmqService: RabbitMqService
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard)
  async handlerOrderCreatedEvent(@Payload() data: any, @Ctx() ctx: RmqContext) {
      this.billingService.bill(data);
      this.rmqService.ack(ctx);
      
  }
}
