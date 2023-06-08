import {Module} from "@nestjs/common";
import {UserServiceSequelize} from "./user/user.service-sequelize";
import {UserServiceMongoose} from "./user/user.service-mongoose";
import {DbModule} from "../test_db/db.module";

/**
 * Так же сюда импортировать BD и подключать их в сервисах
 */

@Module({
    providers: [
        UserServiceSequelize,
        UserServiceMongoose,
    ],
    exports: [
        UserServiceSequelize,
        UserServiceMongoose,
    ],
    imports: [
        DbModule,
    ]
})
export class ServiceMiddlewareModule {}