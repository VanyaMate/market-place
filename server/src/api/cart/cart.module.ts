import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import {TokensModule} from "../tokens/tokens.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Cart, CartSchema} from "./schema/cart.schema";
import {UsersModule} from "../users/users.module";

@Module({
    controllers: [CartController],
    providers: [
        CartService
    ],
    imports: [
        MongooseModule.forFeature([ { name: Cart.name, schema: CartSchema } ]),
        TokensModule,
        UsersModule,
    ]
})
export class CartModule {}
