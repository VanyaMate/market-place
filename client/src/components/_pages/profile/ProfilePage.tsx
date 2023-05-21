import React from 'react';
import ProfileHead from "./profile-head/ProfileHead";
import {useMySelector} from "../../../hooks/_redux/useMySelector.hook";
import ProfileOrders from "./profile-orders/ProfileOrders";

const ProfilePage = () => {
    const auth = useMySelector((state) => state.auth);

    return (
        <div>
            <ProfileHead {...auth.user!}/>
            <ProfileOrders orders={auth.user!.orders}/>
        </div>
    );
};

export default ProfilePage;