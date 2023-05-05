import {Column, Entity, ManyToOne, ObjectId, ObjectIdColumn} from "typeorm";
import {User} from "../user/user.entity";


@Entity()
export class Token {

    @ObjectIdColumn()
    id: string;

    @Column()
    token: string;

    @Column()
    user: ObjectId;

}