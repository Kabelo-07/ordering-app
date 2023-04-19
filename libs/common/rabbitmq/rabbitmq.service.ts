import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {RmqOptions, Transport, RmqContext} from "@nestjs/microservices"

@Injectable()
export class RabbitMqService {
    constructor(private readonly configService: ConfigService) {}

    getOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true
            }
        }
    }

    ack(ctx: RmqContext) {
        const channel = ctx.getChannelRef();
        const orgMsg = ctx.getMessage();

        channel.ack(orgMsg);
    }
    
}
