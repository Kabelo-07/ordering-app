import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "./users/schemas/user.schema";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CurrentUser } from "./current-user.decorator";
import { MessagePattern } from "@nestjs/microservices";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
        this.authService.login(user, response);
        response.send(user);
    }

    @MessagePattern('validate_user')
    @UseGuards(JwtAuthGuard)
    async validateUser(@CurrentUser() user: User) {
        return user;
    }

}