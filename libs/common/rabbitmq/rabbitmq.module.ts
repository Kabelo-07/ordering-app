import { Module, DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RabbitMqService } from "./rabbitmq.service";
import { ClientsModule, Transport } from '@nestjs/microservices';


interface RmqModuleOptions {
    name: string;
}

@Module({
    providers: [RabbitMqService],
    exports: [RabbitMqService]
})
export class RabbitmqModule {
    static register({ name }: RmqModuleOptions): DynamicModule {
        return {
            module: RabbitmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>('RABBIT_MQ_URI')],
                                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`)
                            }
                        }),
                        inject: [ConfigService]
                    }
                ]),
            ],
            exports: [ClientsModule]
        }
    }
}
