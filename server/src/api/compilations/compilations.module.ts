import {Module} from "@nestjs/common";
import {CompilationsService} from "./compilations.service";
import {CompilationsController} from "./compilations.controller";
import {ProductsModule} from "../products/products.module";
import {UsersModule} from "../users/users.module";
import {TokensModule} from "../tokens/tokens.module";

@Module({
    providers: [ CompilationsService ],
    controllers: [ CompilationsController ],
    imports: [
        ProductsModule,
        UsersModule,
        TokensModule
    ]
})
export class CompilationsModule {}