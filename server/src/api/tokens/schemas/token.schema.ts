import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";
import {HydratedDocument} from "mongoose";

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {

    @Prop()
    token: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const TokenSchema = SchemaFactory.createForClass(Token);