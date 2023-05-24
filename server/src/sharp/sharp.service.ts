import {Injectable} from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as sharp from "sharp";

@Injectable()
export class SharpService {

    async saveProductImage (buffer, writePath: string, fileName: string) {
        const folderPath = path.join(__dirname, '../..', 'public', 'image', 'product', writePath);
        const filePath = path.resolve(folderPath, fileName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        const prepare = sharp(buffer)
            .jpeg({
                progressive: true,
            });

        await prepare
            .resize({
                width: 100,
                height: 100,
                fit: 'inside'
            })
            .toFile(filePath + '-100x100.jpeg');

        await prepare
            .resize({
                width: 200,
                height: 200,
                fit: 'inside'
            })
            .toFile(filePath + '-200x200.jpeg');

        await prepare
            .resize({
                width: 400,
                height: 400,
                fit: 'inside'
            })
            .toFile(filePath + '-400x400.jpeg');

        await prepare.toFile(filePath + '.jpeg');

        return writePath + '/' + fileName;
    }

    saveAvatarImage () {

    }

}