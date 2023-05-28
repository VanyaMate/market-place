import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {authActions} from "../../store/auth/auth.slice";
import {globalActions} from "../../store/global/global.slice";
import {cartActions} from "../../store/cart/cart.slice";
import {notificationsSlice} from "../../store/notifications/notifications.slice";

const actions = {
    ...authActions,
    ...globalActions,
    ...cartActions,
    ...notificationsSlice.actions,
};

export const useActions = function () {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}