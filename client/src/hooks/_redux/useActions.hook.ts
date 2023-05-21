import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {authActions} from "../../store/auth/auth.slice";
import {globalActions} from "../../store/global/global.slice";

const actions = {
    ...authActions,
    ...globalActions,
};

export const useActions = function () {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}