import React from 'react';
import css from './ProfileShortMenu.module.scss';
import Button from "../_ui/_buttons/button/Button";
import DefaultLink from "../_ui/_links/default-link/DefaultLink";
import Vertical from "../_ui/_containers/vertical/Vertical";
import {useLazyLogoutQuery} from "../../store/auth/auth.api";
import {useActions} from "../../hooks/_redux/useActions.hook";
import {ROUTE_BUSINESS, ROUTE_PROFILE} from "../../cfg/links.config";

const ProfileShortMenu = () => {
    const [dispatchLogout, {isLoading, isError, data}] = useLazyLogoutQuery();
    const {resetUser} = useActions();

    const logout = function () {
        dispatchLogout().then(() => {
            resetUser();
        })
    }

    return (
        <Vertical className={css.container} offset={5}>
            <DefaultLink to={ROUTE_PROFILE} className={css.item}>Profile</DefaultLink>
            <DefaultLink to={ROUTE_BUSINESS} className={css.item}>Business</DefaultLink>
            <Button onClick={logout} active className={css.item}>Logout</Button>
        </Vertical>
    );
};

export default ProfileShortMenu;