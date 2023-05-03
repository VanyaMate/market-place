import {Column, Entity, ObjectId, ObjectIdColumn, OneToMany} from 'typeorm';
import {Order} from "../orders/order.entity";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    email: string;

    @Column({ default: true })
    isActivated: boolean = false;

    @Column()
    password: string;

    @Column({ default: true })
    firstName: string | null = null;

    @Column({ default: true })
    lastName: string | null = null;

    @Column({ default: true })
    telephone: string | null = null;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

}