import {Injectable} from "@nestjs/common";

@Injectable()
export class DbPostgreeService {

    getUsers () {
        return {
            id: 200,
            name: 'Vanya',
            createdAt: 123123123123,
        }
    }

}