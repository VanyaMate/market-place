import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";

export type CartDocument = Cart & Document;

export interface ICartProduct {
    product: string,
    amount: number,
}

@Schema()
export class Cart {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop([ { product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, amount: Number } ])
    products: ICartProduct[]

}

export const CartSchema = SchemaFactory.createForClass(Cart);