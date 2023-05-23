import * as mongoose from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Order} from "../../orders/schemas/order.schema";
import {HydratedDocument} from "mongoose";
import {Cart} from "../../cart/schema/cart.schema";

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

    @Prop({ type: String })
    sessionKey: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
    cart: Cart;

    @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Order' } ]})
    orders: Order[];

}

export const UserSchema = SchemaFactory.createForClass(User);