import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import { ClientProxy} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Constants } from './constants';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly repo: OrdersRepository, 
    @Inject(Constants.BILLING_SERVICE) private readonly billingClient: ClientProxy
  ) {}
  
  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.repo.startTransaction();

    try {
      const order = this.repo.create(request, { session });

      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
          Authentication: authentication
        })
      );
      
      await session.commitTransaction();
      return order;

    } catch( error ) {
      await session.abortTransaction();
      throw error;
    }
    
  }

  async getOrders() {
    return this.repo.find({});
  }

}
