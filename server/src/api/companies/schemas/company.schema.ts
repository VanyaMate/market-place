import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {Image} from "../../image-loader/schemas/image.schema";
import * as mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {

    @Prop({ type: String })
    title: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name })
    icon: Image;

    @Prop({ type: String })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    owner: User;

}

export const CompanySchema = SchemaFactory.createForClass(Company);