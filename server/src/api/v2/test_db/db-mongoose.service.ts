import {Injectable} from "@nestjs/common";

@Injectable()
export class DbMongooseService {

    users () {
        return [
            {
                _id: {value: 100},
                name: 'Vanya',
                createdAt: new Date(),
            }
        ]
    }

}