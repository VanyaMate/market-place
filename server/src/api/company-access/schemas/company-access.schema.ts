import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {User} from "../../user/schemas/user.schema";
import {Company} from "../../companies/schemas/company.schema";
import {HydratedDocument} from "mongoose";

export type CompanyAccessDocument = HydratedDocument<CompanyAccess>;

@Schema()
export class CompanyAccess {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    company: Company;

}

export const CompanyAccessSchema = SchemaFactory.createForClass(CompanyAccess);