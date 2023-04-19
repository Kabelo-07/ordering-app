import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsPhoneNumber } from "class-validator";
import { AbstractDocument } from "libs/common";

@Schema({ versionKey: false})
export class Order extends AbstractDocument {

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);