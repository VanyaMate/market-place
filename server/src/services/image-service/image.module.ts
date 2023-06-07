import {Module} from "@nestjs/common";
import {ImageService} from "./image.service";
import {SharpModule} from "../sharp-service/sharp.module";
import {FileServiceModule} from "../file-service/file-service.module";

@Module({
    providers: [
        ImageService,
    ],
    exports: [
        ImageService,
    ],
    imports: [
        SharpModule,
        FileServiceModule,
    ]
})
export class ImageModule {}