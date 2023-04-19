import { Injectable } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import {v4 as uuidv4} from 'uuid';
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { UserRepository } from "./users.repository";
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from "./dto/input/create-user.request";
import { UpdateUserRequest } from "./dto/input/update-user.request";
import { ObjectId, Types } from "mongoose";

@Injectable()
export class UsersService {

    constructor(private readonly repository: UserRepository) {}

    async createUser(data: CreateUserRequest): Promise<User> {
        const salt = bcrypt.genSaltSync();
        const user = this.repository.create({
            ...data,
            password: await bcrypt.hashSync(data.password, salt)
        });

        return user;
    }

    async updateUser(data: UpdateUserRequest): Promise<User> {
        const user = this.repository.findOneAndUpdate({userId: data.userId}, data);

        return user;
    }

    async getUser(args: GetUserArgs): Promise<User> {
        return this.repository.findOne({userId: args.userId});
    }

    async getUserById(id: any): Promise<User> {
        return this.repository.findOne({_id: id});
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return this.repository.findOne({email: email});
    }

    async getUsers(args: GetUsersArgs): Promise<User[]> {
        if (!args.userIds || args.userIds.length == 0) {
            return this.repository.find({});
        }
        return this.repository.find({args});
    }
}
