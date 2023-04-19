import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Types } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../auth.service";
import { User } from "../users/schemas/user.schema";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    return request?.Authentication
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate({ userId }: TokenPayload): Promise<User | null> {
        try {
            return await this.userService.getUserById({ _id: new Types.ObjectId(userId)});
        } catch(err) {
            throw new UnauthorizedException();
        }
    }
}