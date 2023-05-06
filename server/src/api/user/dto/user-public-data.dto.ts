import {User} from "../schemas/user.schema";

export class UserPublicDataDto {
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;

    constructor (props) {
        this.email = props.email;
        this.firstName = props.firstName;
        this.lastName = props.firstName;
        this.telephone = props.telephone;
    }
}