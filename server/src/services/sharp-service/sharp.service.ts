import {Injectable} from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as sharp from "sharp";

export interface ImageSize {
    width?: number;
    height?: number;
}

@Injectable()
export class SharpService {

    async saveOptimizeImage (buffer: Buffer, savePath: string, fileName: string, sizes: ImageSize[]): Promise<void> {
        const fullFilePath = path.resolve(savePath, fileName);

        // Если такой папки не существует -> создаем
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath, { recursive: true });
        }

        const prepare = sharp(buffer)
            .jpeg({
                progressive: true
            });

        // Сохраняю оригинал
        await prepare.toFile(`${ fullFilePath }.jpeg`);

        // Сохраняю размеры
        for (let i = 0; i < sizes.length; i++) {
            const size = sizes[i];
            const sizeName = `${ size.width ?? size.height }x${ size.height ?? size.width }`;
            const fullFileName = `${ fullFilePath }-${ sizeName }.jpeg`
            await prepare
                .resize({...size, fit: 'inside'})
                .toFile(fullFileName);
        }
    }

}