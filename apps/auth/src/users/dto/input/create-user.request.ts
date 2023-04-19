import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserRequest {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    age: number;
}
