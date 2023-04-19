import { Body, Controller, Post} from "@nestjs/common";
import { CreateUserRequest } from "./dto/input/create-user.request";
import { UsersService } from "./users.service";

@Controller('auth/users')
export class UserController {

    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() request: CreateUserRequest) {
        return this.userService.createUser(request);
    }

}