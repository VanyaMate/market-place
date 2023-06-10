import {IUser} from "../user/user.interface";

export interface IToken {
    token: string;
    user: Partial<IUser>;
}