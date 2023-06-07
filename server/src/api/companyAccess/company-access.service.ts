import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CompanyAccess} from "./schemas/company-access.schema";
import {Model} from "mongoose";

@Injectable()
export class CompanyAccessService {

    constructor(@InjectModel(CompanyAccess.name) private accessModel: Model<CompanyAccess>) {}

    async create (userId: string, companyId: string) {
        try {
            return await this.accessModel.create({
                user: userId,
                company: companyId,
            });
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async delete (userId: string, companyId: string) {
        try {
            return await this.accessModel.deleteOne({
                user: userId,
                company: companyId,
            })
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async deleteByAccessId (accessId: string) {
        try {
            return await this.accessModel.deleteOne({
                _id: accessId
            })
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async getAllCompaniesAccessByUserId (userId: string) {
        try {
            return await this.accessModel.find({
                user: userId
            })
                .populate('company');
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async getAllUsersWithAccessByCompanyId (companyId: string) {
        try {
            return await this.accessModel.find({
                company: companyId
            })
                .populate('user');
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async checkAccess (userId: string, companyId: string) {
        try {
            const access = await this.accessModel.findOne({
                user: userId,
                company: companyId,
            })

            return !!access;
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

}