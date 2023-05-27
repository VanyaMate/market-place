import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {FolderType} from "../../../file-service/file-service.service";
import {User} from "../../user/schemas/user.schema";
import * as mongoose from "mongoose";
import {HydratedDocument} from "mongoose";
import {BrandSchema} from "../../brands/schemas/brand.schema";

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {

    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    type: FolderType;

    @Prop({ type: String })
    path: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;

}

export const ImageSchema = SchemaFactory.createForClass(Image);

ImageSchema.pre(['find', 'findOne'], function (next) {
    this.select('-user');
    this.select('-__v');
    next();
});