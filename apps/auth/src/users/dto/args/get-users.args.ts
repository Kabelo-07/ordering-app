import { IsArray, IsOptional} from "class-validator";

export class GetUsersArgs {
    
    @IsArray()
    userIds: string[];

    fieldName?: string
}
