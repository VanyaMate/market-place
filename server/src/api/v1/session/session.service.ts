import {BadRequestException, Injectable} from "@nestjs/common";
import {Session} from "./schemas/session.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {randomUUID} from "crypto";

@Injectable()
export class SessionService {

    constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {}

    async create (userId: string): Promise<string> {
        try {
            const key = randomUUID();
            await this.sessionModel.create({
                key,
                user: userId,
            })
            return key;
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async findByUserId (userId: string): Promise<string> {
        try {
            const session = await this.sessionModel.findOne({ user: userId });
            if (!!session) {
                return session.key;
            }

            throw { message: 'Ключ для этого пользователя не найден' };
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

    async regenerate (userId: string): Promise<string> {
        try {
            const key = randomUUID();
            await this.sessionModel.updateOne({
                user: userId,
            }, { key })
            return key;
        }
        catch (e) {
            throw new BadRequestException(e);
        }
    }

}