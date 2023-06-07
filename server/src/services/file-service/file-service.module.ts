import {Module} from "@nestjs/common";
import {FileServiceService} from "./file-service.service";

@Module({
    providers: [
        FileServiceService
    ],
    exports: [
        FileServiceService
    ]
})
export class FileServiceModule {}