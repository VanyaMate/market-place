import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Types} from "mongoose";
import {User} from "../../user/schemas/user-mongoose.schema";

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {

    @Prop({ type: String })
    token: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

}

export const TokenSchema = SchemaFactory.createForClass(Token);