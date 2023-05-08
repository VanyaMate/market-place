import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {User} from "../../user/schemas/user.schema";
import * as mongoose from "mongoose";

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.pre(['find', 'findOne'], function (next) {
    this.select('-author');
    next();
});