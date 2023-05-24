import React from 'react';
import ProfileTitleIcon from "./profile/ProfileTitleIcon";
import css from './ProfileMethods.module.scss';
import Row from "../../../../_ui/_containers/row/Row";
import {useMySelector} from "../../../../../hooks/_redux/useMySelector.hook";
import LoginTitleIcon from "./login/LoginTitleIcon";
import CartTitleIcon from "./cart/CartTitleIcon";

const ProfileMethods = () => {
    const auth = useMySelector((state) => state.auth);

    return (
        <Row className={css.container} offset={10}>
            {
                auth.user ?
                    <>
                        <ProfileTitleIcon/>
                        <ProfileTitleIcon/>
                        <ProfileTitleIcon/>
                        <CartTitleIcon/>
                    </>
                : <LoginTitleIcon/>
            }
        </Row>
    );
};

export default ProfileMethods;