import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";
import {Document} from "mongoose";

export type OrderDocument = Order & Document;

@Schema()
export class Order {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const OrderSchema = SchemaFactory.createForClass(Order);