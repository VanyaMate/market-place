import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {authActions} from "../../store/auth/auth.slice";

const actions = {
    ...authActions
};

export const useActions = function () {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}