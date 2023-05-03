import {Column, Entity, ManyToOne, ObjectIdColumn} from "typeorm";
import {User} from "../user/user.entity";


@Entity()
export class Token {

    @ObjectIdColumn()
    id: string;

    @Column()
    token: string;

    @ManyToOne(() => User, '')
    user: User;

}