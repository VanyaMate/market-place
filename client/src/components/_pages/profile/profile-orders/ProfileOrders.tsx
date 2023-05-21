import React from 'react';
import OrderItem from "./order-item/OrderItem";

export interface IProfileOrders {
    orders: string[];
}

const ProfileOrders: React.FC<IProfileOrders> = (props) => {
    return (
        <div>
            Orders:
            {
                props.orders.map((order) => {
                    return <OrderItem/>
                })
            }
        </div>
    );
};

export default ProfileOrders;