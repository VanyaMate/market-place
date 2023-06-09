import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
    IMAGE = 'image',
    DOCS = 'docs',
}

@Injectable()
export class FileSystemService {

    writeFile (type: FileType, file: Express.Multer.File): string {
        try {
            const fileExt = file.originalname.split('.').pop();
            const fileName = `${ uuid.v4() }.${ fileExt }`;
            const filePath = path.resolve(__dirname, '../..', 'public', type);

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

            return type + '/' + fileName;
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}