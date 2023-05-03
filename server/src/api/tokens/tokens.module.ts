import {Module} from "@nestjs/common";
import {TokensService} from "./tokens.service";
import {ConfigModule} from "@nestjs/config";

@Module({
    providers: [ TokensService ],
    imports: [ ConfigModule ],
    exports: [ TokensService ],
})
export class TokensModule {}