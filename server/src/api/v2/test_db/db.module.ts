import {Module} from "@nestjs/common";
import {DbMongooseService} from "./db-mongoose.service";
import {DbPostgreeService} from "./db-postgree.service";

@Module({
    providers: [
        DbMongooseService,
        DbPostgreeService,
    ],
    exports: [
        DbMongooseService,
        DbPostgreeService,
    ],
})
export class DbModule {}