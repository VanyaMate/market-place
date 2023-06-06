import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {User} from "../../user/schemas/user.schema";
import * as mongoose from "mongoose";
import {Image} from "../../image-loader/schemas/image.schema";
import {Company} from "../../companies/schemas/company.schema";

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    company: Company;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name })
    image: Image;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    author: User;

}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.pre(['find', 'findOne'], function (next) {
    this.populate('image');
    this.populate('company', ['_id', 'title', 'description', 'image']);
    this.select('-author');
    this.select('-__v');
    next();
});