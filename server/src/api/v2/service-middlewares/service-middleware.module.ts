import {Module} from "@nestjs/common";
import {UserServiceSequelize} from "./user/user.service-sequelize";
import {UserServiceMongoose} from "./user/user.service-mongoose";

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
    ]
})
export class ServiceMiddlewareModule {}