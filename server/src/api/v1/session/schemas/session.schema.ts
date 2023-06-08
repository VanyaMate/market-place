import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../user/schemas/user.schema";
import * as mongoose from "mongoose";
import {HydratedDocument} from "mongoose";

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {

    @Prop({ type: String })
    key: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;

}

export const SessionSchema = SchemaFactory.createForClass(Session);