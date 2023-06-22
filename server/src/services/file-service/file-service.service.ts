import * as path from 'path';
import {Injectable} from "@nestjs/common";

export enum FolderType {
    PRODUCT = 'product',
    AVATAR = 'avatar',
    IMAGE = 'image',
    BRAND = 'brand',
    COMPANY = 'company',
}

@Injectable()
export class FileServiceService {

    getUserFolder (userId: string, folderType: FolderType): { public: string, server: string } {
        const publicPath = ['customers', userId, folderType].join('/');
        const serverPath = path.resolve(__dirname, '../../..', 'public', publicPath);
        return { public: publicPath, server: serverPath };
    }

}