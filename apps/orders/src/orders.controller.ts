import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'libs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() orderReq: CreateOrderRequest, @Req() request: any) {
     return this.ordersService.createOrder(orderReq, request.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
     return this.ordersService.getOrders();
  }
}
