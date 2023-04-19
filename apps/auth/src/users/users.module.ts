import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./users.controller";
import { UserRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
    providers: [UserRepository, UsersService],
    imports: [MongooseModule.forFeature([
        {name: User.name, schema: UserSchema}
    ])],
    exports: [UsersService],
    controllers: [UserController]
})
export class UsersModule {}