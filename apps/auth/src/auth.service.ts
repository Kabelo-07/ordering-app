import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';
import { User } from './users/schemas/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async validate(email: string, password: string): Promise<User| null> {
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!user) {
            throw new UnauthorizedException();
        }
        
        return user;
    }

    async login(user: User, response: Response) {
        const payload: TokenPayload = {
            email: user.email,
            sub: user._id.toHexString(),
            first_name: user.firstName,
            last_name: user.lastName,
            userId: user._id.toHexString()
        }

        const expires = new Date();
        expires.setSeconds(
            expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
        );

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET')
        });

        response.cookie('Authentication', accessToken, {
            httpOnly: true,
            expires
        })
    }

    async verifyToken(token: string): Promise<User> {
        const decoded = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET
        })

        const user = this.userService.getUserByEmail(decoded.email);

        if(!user) {
            throw new Error("Error decoding JWT token");
        }

        return user;
    }
}

export interface TokenPayload {
    userId: string,
    sub: string,
    email: string,
    first_name: string,
    last_name: string
}
