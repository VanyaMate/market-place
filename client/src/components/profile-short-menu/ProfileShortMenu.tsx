import React from 'react';
import css from './ProfileShortMenu.module.scss';
import {Link} from "react-router-dom";
import {ROUTE_MY_COMPANY, ROUTE_PROFILE} from "../../cfg/links.config";
import Button from "../_ui/_buttons/button/Button";
import DefaultLink from "../_ui/_links/default-link/DefaultLink";
import Vertical from "../_ui/_containers/vertical/Vertical";
import {useLazyLogoutQuery} from "../../store/auth/auth.api";
import {useActions} from "../../hooks/_redux/useActions.hook";

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
            <DefaultLink to={ROUTE_MY_COMPANY} className={css.item}>MyCompany</DefaultLink>
            <Button onClick={logout} active className={css.item}>Logout</Button>
        </Vertical>
    );
};

export default ProfileShortMenu;