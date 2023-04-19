import { IsString, IsNotEmpty, IsPositive, IsPhoneNumber, Min } from 'class-validator'

export class CreateOrderRequest {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPositive()
    @Min(10)
    price: number;

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;
}