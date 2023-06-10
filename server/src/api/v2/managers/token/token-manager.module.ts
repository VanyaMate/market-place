import {Module} from "@nestjs/common";
import {TokenManagerController} from "./token-manager.controller";
import {TokenModule} from "../../services/token/token.module";

@Module({
    controllers: [
        TokenManagerController,
    ],
    imports: [
        TokenModule,
    ]
})
export class TokenManagerModule {}