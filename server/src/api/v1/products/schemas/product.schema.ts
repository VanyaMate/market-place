import {Schema, Prop, SchemaFactory, MongooseModule} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import * as mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";
import {Brand} from "../../brands/schemas/brand.schema";
import {Image} from "../../image-loader/schemas/image.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name })
    generalImage: Image;

    @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: Image.name } ] })
    images: Image[];

    @Prop({ type: Number })
    price: number;

    @Prop({ type: String })
    priceCurrency: string;

    @Prop({ type: Number })
    discount: Number;

    @Prop({ type: String })
    discountType: string;

    @Prop({ type: Date, default: Date.now })
    date: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Brand.name })
    brand: Brand;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    author: User;

}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre(["find", "findOne"], function (next) {
    this.populate('brand', ['title', 'description', 'image']);
    this.populate('generalImage', ['title', 'path', 'type']);
    this.populate('images', ['title', 'path', 'type']);
    this.select('-author');
    this.select('-__v');
    next();
})