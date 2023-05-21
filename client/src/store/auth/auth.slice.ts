import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "./auth.types";



interface AuthData {
    user: IUser | null,
}

const initialState: AuthData = {
    user: null
};

const authSlice = createSlice({
    name: 'authdata',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthData>) => {
            state.user = action.payload.user;
        },
        resetUser: (state) => {
            state.user = null;
        }
    }
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;