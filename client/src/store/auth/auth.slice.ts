import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "./auth.types";
import {AUTH_STORAGE_NAME} from "../../cfg/storage.config";

interface AuthData {
    user: IUser | null;
    authDate: number;
    updateByToken: boolean;
}

const authData = JSON.parse(sessionStorage.getItem(AUTH_STORAGE_NAME) || '{}');
const initialState: AuthData = {
    user: authData.user ?? null,
    authDate: authData.authDate ?? 0,
    updateByToken: !authData.user,
};

const authSlice = createSlice({
    name: 'authdata',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.authDate = Date.now();
            state.updateByToken = false;
            sessionStorage.setItem(AUTH_STORAGE_NAME, JSON.stringify(state));
        },
        resetUser: (state) => {
            sessionStorage.removeItem(AUTH_STORAGE_NAME);
            state.user = null;
            state.authDate = 0;
        }
    }
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;