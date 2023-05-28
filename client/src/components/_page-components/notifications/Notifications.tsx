import React from 'react';
import {useMySelector} from "../../../hooks/_redux/useMySelector.hook";
import Vertical from "../../_ui/_containers/vertical/Vertical";
import css from './Notifications.module.scss';
import {NotificationType} from "../../../store/notifications/notifications.slice";
import AddToCartErrorNotification from "./notification/add-to-cart-notification/AddToCartErrorNotification";
import {IProduct} from "../../../store/products/products.types";

const Notifications = () => {
    const notifications = useMySelector((state) => state.notifications);

    return (
        <Vertical offset={5} className={css.container}>
            {
                notifications.notifications.map((notification) => {
                    switch (notification.type) {
                        case NotificationType.ADD_TO_CART_ERROR:
                            return <AddToCartErrorNotification key={`${notification.id}`} product={notification.data as IProduct}/>
                        default:
                            return <div>Error</div>
                    }
                })
            }
        </Vertical>
    );
};

export default Notifications;