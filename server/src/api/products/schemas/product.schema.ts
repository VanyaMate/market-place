import {Schema, Prop, SchemaFactory, MongooseModule} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import * as mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    generalImage: string;

    @Prop({ type: [String] })
    images: string[];

    @Prop({ type: Number })
    price: number;

    @Prop({ type: String })
    priceCurrency: string;

    @Prop({ type: Number })
    discount: Number;

    @Prop({ type: String })
    discountType: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

}

export const ProductSchema = SchemaFactory.createForClass(Product);