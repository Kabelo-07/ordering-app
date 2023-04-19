import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "libs/common";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User extends AbstractDocument {

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    firstName: string;

    @Prop()
    password?: string;

    @Prop({required: true})
    lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);