import * as path from 'path';
import {Injectable} from "@nestjs/common";

export enum FolderType {
    PRODUCT = 'product',
    AVATAR = 'avatar',
    IMAGE = 'image',
    BRAND = 'brand',
}

@Injectable()
export class FileServiceService {

    getUserFolder (userId: string, folderType: FolderType): string {
        return path.resolve(__dirname, '../..', 'public', 'customers', userId, folderType);
    }

}