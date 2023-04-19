import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "libs/common";
import { Connection, FilterQuery, Model } from "mongoose";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
    
    protected readonly logger = new Logger(UserRepository.name);

    constructor(@InjectModel(User.name) userModel: Model<User>, @InjectConnection() connection: Connection) {
        super(userModel, connection);
    }
}