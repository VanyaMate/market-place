import * as mongoose from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Order} from "../../orders/schemas/order.schema";
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop()
    email: string;

    @Prop()
    isActivated: boolean;

    @Prop()
    password: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    telephone: string;

    @Prop()
    secretKey: string;

    @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Order' } ]})
    orders: Order[];

}

export const UserSchema = SchemaFactory.createForClass(User);