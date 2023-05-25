import {Injectable} from "@nestjs/common";
import {FileServiceService, FolderType} from "../file-service/file-service.service";
import {ImageSize, SharpService} from "../sharp-service/sharp.service";
import {randomUUID} from "crypto";

@Injectable()
export class ImageService {

    constructor(private fileService: FileServiceService,
                private sharpService: SharpService) {}

    async saveOptimizedImage (buffer: Buffer, folderType: FolderType, userId: string, sizes: ImageSize[]): Promise<string> {
        const folder = this.fileService.getUserFolder(userId, folderType);
        const fileName = randomUUID();
        await this.sharpService.saveOptimizeImage( buffer, folder.server, fileName, sizes );
        return folder.public + '/' + fileName;
    }

}