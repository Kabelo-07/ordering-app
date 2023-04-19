import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { DatabaseModule, RabbitmqModule, AuthModule } from 'libs/common';
import { Constants } from './constants';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          MONGODB_URI: Joi.string().required(),
          PORT: Joi.number().required()
        }),
        envFilePath: './apps/orders/.env'
      }),
      DatabaseModule,
      MongooseModule.forFeature([{
        name: Order.name, schema: OrderSchema
      }]),
      RabbitmqModule.register({
        name: Constants.BILLING_SERVICE
      }),
      AuthModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
