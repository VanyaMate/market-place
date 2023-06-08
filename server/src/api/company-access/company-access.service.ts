import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CompanyAccess} from "./schemas/company-access.schema";
import {Model} from "mongoose";
import {ISearchOptions, Projections} from "../../interfaces/search.interfaces";
import {CompanyDocument} from "../companies/schemas/company.schema";
import {getSortParams} from "../../helpers/utils";
import {IMultiResponse} from "../../interfaces/responses.interface";

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
            throw new BadRequestException(e).getResponse();
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
            throw new BadRequestException(e).getResponse();
        }
    }

    async deleteAllByCompanyId (companyId: string) {
        try {
            return await this.accessModel.deleteMany({
                company: companyId,
            })
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async deleteByAccessId (accessId: string) {
        try {
            return await this.accessModel.deleteOne({
                _id: accessId
            })
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
        }
    }

    async getAllCompaniesAccessByUserId (
        userId: string,
        options: Omit<ISearchOptions, keyof { sort: string[] }> = {},
        projections: Projections<CompanyDocument> = {}
    ): Promise<IMultiResponse<CompanyDocument>> {
        try {
            const count = await this.accessModel.find({ user: userId }).count();
            const accesses = await this.accessModel.find({
                user: userId
            }, projections)
                .skip(options.offset)
                .limit(options.limit)
                .populate('company')
                .exec();

            return {
                list: accesses.map((access) => access.company as CompanyDocument),
                options: options,
                count: count
            };
        }
        catch (e) {
            throw new BadRequestException(e).getResponse();
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
            throw new BadRequestException(e).getResponse();
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
            throw new BadRequestException(e).getResponse();
        }
    }

}