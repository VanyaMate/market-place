import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ type: String })
    email: string;

    @Prop({ type: Boolean })
    isActivated: boolean;

    @Prop({ type: String })
    password: string;

    @Prop({ type: String })
    firstName: string;

    @Prop({ type: String })
    lastName: string;

    @Prop({ type: String })
    telephone: string;

}

export const UserSchema = SchemaFactory.createForClass(User);