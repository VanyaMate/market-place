import {Column, Entity, ManyToOne, ObjectId, ObjectIdColumn} from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class Order {

    @ObjectIdColumn()
    id: ObjectId;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

}