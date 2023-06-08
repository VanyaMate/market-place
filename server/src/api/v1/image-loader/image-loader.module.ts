import {Module} from "@nestjs/common";
import {ImageLoaderService} from "./image-loader.service";
import {ImageLoaderController} from "./image-loader.controller";
import {TokensModule} from "../tokens/tokens.module";
import {UsersModule} from "../users/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ImageSchema, Image} from "./schemas/image.schema";
import {ImageModule} from "../../../services/image-service/image.module";
import {SessionModule} from "../session/session.module";

@Module({
    controllers: [
        ImageLoaderController,
    ],
    providers: [
        ImageLoaderService,
    ],
    imports: [
        TokensModule,
        UsersModule,
        ImageModule,
        MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
        SessionModule,
    ],
    exports: [
        ImageLoaderService
    ]
})
export class ImageLoaderModule {}