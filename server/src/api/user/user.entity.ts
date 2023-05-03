import {Column, Entity, ObjectId, ObjectIdColumn, OneToMany} from 'typeorm';
import {Order} from "../orders/order.entity";
import {IsBoolean, IsEmail, IsPhoneNumber, IsString, Length, Max, Min} from "class-validator";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    @IsEmail()
    email: string;

    @Column({ default: true })
    @IsBoolean()
    isActivated: boolean = false;

    @Column()
    password: string;

    @Column()
    @Length(2, 20)
    @IsString()
    firstName: string;

    @Column()
    @Length(2, 20)
    @IsString()
    lastName: string;

    @Column()
    @IsPhoneNumber()
    telephone: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

}