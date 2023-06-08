import {Module} from "@nestjs/common";
import {UserMongooseService} from "./mongoose/user/user-mongoose.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./mongoose/user/schemas/user-mongoose.schema";

@Module({
    providers: [
        UserMongooseService
    ],
    exports: [
        UserMongooseService
    ],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ]
})
export class ServiceMiddlewareModule {}