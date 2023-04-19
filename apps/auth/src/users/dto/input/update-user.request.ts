import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserRequest {

    @IsNotEmpty()
    userId: string;

    @IsOptional()
    @IsNotEmpty()
    age?: number;

    @IsNotEmpty()
    @IsOptional()
    firstName?: string;

    @IsNotEmpty()
    @IsOptional()
    lastName?: string;

    @IsOptional()
    isSubscribed?: boolean;
}
