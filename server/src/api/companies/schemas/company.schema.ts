import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {Image} from "../../image-loader/schemas/image.schema";
import * as mongoose from "mongoose";

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {

    @Prop({ type: String, unique: true })
    title: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name })
    icon: Image;

    @Prop({ type: String })
    description: string;

}

export const CompanySchema = SchemaFactory.createForClass(Company);


CompanySchema.pre(['find', 'findOne'], function (next) {
    this.populate('icon');
    this.select('-__v');
    next();
});