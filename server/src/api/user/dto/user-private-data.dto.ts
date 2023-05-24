export class UserPrivateDataDto {
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
    orders: string[];
    cart: any[];

    constructor (props) {
        this.email = props.email;
        this.firstName = props.firstName;
        this.lastName = props.firstName;
        this.telephone = props.telephone;

        this.orders = props.orders ?? [];
        this.cart = props.cart ?? [];
    }
}